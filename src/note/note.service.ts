import { Injectable, Delete } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from "./dto";
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoteService {
    constructor(private prismaService : PrismaService){}
    
    async getNotes(userId : number){
        const notes = await this.prismaService.user.findMany({
            where: {
                id: userId
            },
            select: {
                note: true
            }
        })
        console.log(notes)
    }
    
    async getNoteById(noteId : number){

    }

    async insertNode(userId: number , insertNoteDTO : InsertNoteDTO){

    }

    async updateNoteById(noteId: number , updateNoteDTO: UpdateNoteDTO){

    }

    async deleteNoteById(noteId: number){

    }
}