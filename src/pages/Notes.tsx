import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotesService from '@/services/NotesService';
import { useNotesStore } from '@/stores/notes.store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './notes.css';

type Props = {};

const Notes = (props: Props) => {
  const navigate = useNavigate();
  const notesService = new NotesService();
  const { setNotes, selectedNoteId, setSelectedNoteId, notes } =
    useNotesStore();
  const [title, setTitle] = useState(
    notes.filter((item) => item._id === selectedNoteId)[0]?.title || ''
  );

  const [noteContent, setNoteContent] = useState('');

  const [note, setNote] = useState(
    notes.filter((item) => item._id === selectedNoteId)[0]?.content || ''
  );

  useEffect(() => {
    setNote(
      notes.filter((item) => item._id === selectedNoteId)[0]?.content || ''
    );
    setTitle(
      notes.filter((item) => item._id === selectedNoteId)[0]?.title || ''
    );
  }, [selectedNoteId]);

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }

    if (!selectedNoteId)
      notesService.getNotes().then((res: any) => {
        console.log('*********getNotes');
        const notesArray = res.data;
        setSelectedNoteId(res.data[0]._id);
        setNotes(notesArray);
        console.log({ res });
      });
  }, []);

  const logoutHandler = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const saveNoteHandler = () => {
    const newNote = {
      content: note,
      title: title,
    };
    notesService.saveNote(newNote);
  };

  return (
    <div className="note-editor">
      <h1 className="note-editor__title">Start taking notes!</h1>
      <ReactQuill theme="snow" value={note} onChange={setNote} />
      <button type="button" onClick={saveNoteHandler}>
        Save Notes
      </button>
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Notes;
