import { IsNotEmpty, IsString } from "class-validator";

export class InsertNoteDTO{ 
    @IsString()
    @IsNotEmpty()
    title: string;

    description?: string;
    
    userId?: number;

    @IsNotEmpty()
    @IsString()
    url: string;
}