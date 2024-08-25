import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Note } from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import * as brcypt from 'bcrypt';
import { AuthDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}
  async register(authDTO: AuthDTO) {
    try {
      const salt = await brcypt.genSalt(10);
      const hashedPassword = await brcypt.hash(authDTO.password, salt);
      //insert data to database
      const user = await this.prismaService.user.create({
        data: {
          email: authDTO.email,
          hashedPassword,
          firtName: '',
          lastName: '',
        },
        select: {
          id: true,
          email: true,
          createdAt: true,
        },
      });
      return user

    } catch (err) {
      if(err.code === 'P2002'){
        throw new ForbiddenException('Error in credentials')
      }
    }
  }

  async login(authDTO : AuthDTO) {
    try{
        const user = await this.prismaService.
                                    user.findUnique({
                                            where:{
                                                email:authDTO.email
                                            }
                                    })
        if(!user){
            throw new ForbiddenException('User not found')
        }
        const match = await brcypt.compare(authDTO.password,user.hashedPassword)
        if(!match){
            throw new ForbiddenException('Incorrect password')
        }
        return await this.generateAccessToken(user.id,user.email)
    }catch(err){
        return err
    }
  }

  async generateAccessToken(userId:number,email:string): Promise<{accessToken: string}> {
      const payload = {
        sub: userId,
        email,
      }
      const accessToken = await this.jwtService.signAsync(payload,{
        expiresIn: '10m',
        secret: this.configService.get('JWT_SECRET')
      })
      
      return {
          accessToken
      }
  }
}
