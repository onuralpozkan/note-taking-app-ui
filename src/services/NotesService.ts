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
class NotesService extends BaseHttpService {
  public async getNotes(): Promise<AxiosResponse<Note[]>> {
    return this.get('api/notes');
  }

  public async saveNote(data: Note) {
    return this.post('api/notes', data);
  }

  public async updateNote(noteId: string, data: Note) {
    return this.put(`api/notes/${noteId}`, data);
  }
  public async deleteNote(noteId: string): Promise<AxiosResponse<Note>> {
    return this.delete(`api/notes/${noteId}`);
  }

  //   public async getUserById(userId: string) {
  //     return this.get<User>(`/users/${userId}`);
  //   }

  //   public async updateUser(userId: string, updatedData: Partial<User>) {
  //     return this.put<User>(`/users/${userId}`, updatedData);
  //   }

  // You can add more methods for user-related API calls
}

export default NotesService;
