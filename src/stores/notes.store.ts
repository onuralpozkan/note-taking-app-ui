import { create } from 'zustand';
import { Note } from './types';

type Notes = {
  notes: Note[];
  setNotes: (arg: Note[]) => void;
  selectedNoteId: string;
  setSelectedNoteId: (arg: string) => void;
};

const useNotesStore = create<Notes>((set) => ({
  selectedNoteId: '',
  notes: [],
  setNotes: (arg: Note[]) => set((state) => ({ ...state, notes: arg })),
  setSelectedNoteId: (arg: string) =>
    set((state) => ({ ...state, selectedNoteId: arg })),
}));

export { useNotesStore };
