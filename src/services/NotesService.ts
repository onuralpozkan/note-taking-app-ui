import { AxiosResponse } from 'axios';
import BaseHttpService from './BaseHttpService';
import { Note } from '@/stores/types';

export type RegisterUserType = {
  username: string;
  email: string;
  password: string;
};

export type LoginUserType = {
  username: string;
  password: string;
};

type NoteWithoutId = Omit<Note, '_id'>;

class NotesService extends BaseHttpService {
  public async getNotes(): Promise<AxiosResponse<Note[]>> {
    return this.get('api/notes');
  }

  public async saveNote(data: NoteWithoutId) {
    return this.post('api/notes', data);
  }

  public async updateNote(noteId: string, data: NoteWithoutId) {
    return this.put(`api/notes/${noteId}`, data);
  }
  public async deleteNote(noteId: string): Promise<AxiosResponse<Note>> {
    return this.delete(`api/notes/${noteId}`);
  }
}

export default NotesService;
