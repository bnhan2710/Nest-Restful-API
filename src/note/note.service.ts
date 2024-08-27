import { Injectable, Delete, NotFoundException } from '@nestjs/common';
import { InsertNoteDTO, UpdateNoteDTO } from "./dto";
import { PrismaService } from '../prisma/prisma.service';
import { url } from 'inspector';

@Injectable()
export class NoteService {
    constructor(private prismaService : PrismaService){}
    
    async getNotes(userId : number){
        try{
            const notes = await this.prismaService.note.findMany({
                where: {
                    userId
                }
            })
            if(notes.length == 0) {
                throw new NotFoundException('Not found any note')
            }
        return notes
    }catch(err){
        return err
    }
    }
    
    async getNoteById(noteId : number){
        const note = await this.prismaService.note.findUnique({
            where: {
                id:noteId
            }
        })
        if(!note){
            throw new NotFoundException('Not Found Notes')
        }
        return note
    }

    async insertNote(userId: number , insertNoteDTO : InsertNoteDTO){
        try{
        const note = await this.prismaService.note.create({
                data: {
                    userId,
                    title: insertNoteDTO.title,
                    description: insertNoteDTO.description,
                    url: insertNoteDTO.url
                }
        })
        return note
    }catch(err){
        return err
    }
    }

    async updateNoteById(noteId: number , updateNoteDTO: UpdateNoteDTO){
        try{
        const checkExist = await this.prismaService.note.findUnique({
            where: {
                id: noteId
            }
        })
        if(!checkExist){
            throw new NotFoundException('Note not found')
        }
         await this.prismaService.note.update({
            where: {
                id: noteId
            },
            data: {
                title: updateNoteDTO.title,
                description: updateNoteDTO.description,
                url: updateNoteDTO.url
            }
        })
        return 'Note updated successfully'
    }catch(err){
        return err
     }
    }

    async deleteNoteById(noteId: number){
        try{
            const checkExist = await this.prismaService.note.findUnique({
                where: {
                    id: noteId
                }
            })
            if(!checkExist){
                throw new NotFoundException('Note not found')
            }
            await this.prismaService.note.delete({
            where: {
                id: noteId
            }
        })
        return 'Note deleted successfully'
    }catch(err){
        return err
    }
    }
}