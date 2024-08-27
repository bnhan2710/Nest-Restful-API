import { IsNotEmpty, IsString } from "class-validator";

export class InsertNoteDTO{ 
    @IsString()
    @IsNotEmpty()
    title: string;

    description?: string;
    
    @IsNotEmpty()
    @IsString()
    url: string;
}