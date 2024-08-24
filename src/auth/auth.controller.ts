import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { request } from "http";
import { AuthDTO } from "./dto";

@Controller('auth')
export class AuthController{
    //auth service is auto created when init the controller
    constructor(private authService:AuthService){
        
    }

    @Post('register')
    register(@Body() body:AuthDTO){
        return this.authService.register(body)
    }

    @Post('login')
    login(@Body() body:AuthDTO){
        return this.authService.login(body)
    }
}