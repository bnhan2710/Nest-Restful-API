import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Note } from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import * as brcypt from 'bcrypt';
import { AuthDTO } from './dto';
@Injectable({})
export class AuthService {
  constructor(private prismaService: PrismaService) {}
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
        return user
    }catch(err){
        return err
    }
  }
}
