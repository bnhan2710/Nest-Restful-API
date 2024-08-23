import { Injectable } from "@nestjs/common";
import {User,Note} from "prisma/prisma-client" 
@Injectable({})

export class AuthService{
    register(){
        return {
            message: 'Register user'
        }
    }
    login(){
        return {
            message: 'Login user'
        }
    }
}