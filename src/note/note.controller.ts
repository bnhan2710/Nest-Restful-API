import { Controller, UseGuards , Get , Put, Req, Body, Post ,Delete, Param, ParseIntPipe } from '@nestjs/common';
import { MyJwtGuard } from '../auth/guard';
import { NoteService } from './note.service';
import { GetUser } from '../auth/decorator/user.decorator';
import { InsertNoteDTO } from './dto/insert.note.dto';
import { UpdateNoteDTO } from './dto/update.note.dto';

@UseGuards(MyJwtGuard)
@Controller('notes')
export class NoteController {
    constructor( private noteService : NoteService ) { }
    @Get()
    getNotes(@GetUser('id') userId: number){
        return this.noteService.getNotes(userId)
    }
    @Get(':id')
    getNoteById(@Param('id' ,ParseIntPipe) noteId : number){
        return this.noteService.getNoteById(noteId)
    }
    @Post()
    insertNode(
        @GetUser('id') userId: number,
        @Body() insertNoteDTO : InsertNoteDTO
    ){
        return this.noteService.insertNote(userId, insertNoteDTO)
    }
    @Put(':id')
    updateNoteById(
        @Param('id', ParseIntPipe) noteId: number,
        @Body() updateNoteDTO : UpdateNoteDTO
    ){
        return this.noteService.updateNoteById(noteId, updateNoteDTO)
    }
    @Delete(':id')
    deleteNoteById( @Param('id', ParseIntPipe) noteId: number){
        return this.noteService.deleteNoteById(noteId)
    }
}
