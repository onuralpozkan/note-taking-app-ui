import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotesService from '@/services/NotesService';
import { useNotesStore } from '@/stores/notes.store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './notes.css';
import { CreateNoteModal } from '@/common/modal/';
import { Box, Button, ButtonGroup } from '@mui/material';

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
    notes.find((item) => item._id === selectedNoteId)?.content || ''
  );

  useEffect(() => {
    setNote(notes.find((item) => item._id === selectedNoteId)?.content || '');
    setTitle(notes.find((item) => item._id === selectedNoteId)?.title || '');
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
    Cookies.remove('username');
    setSelectedNoteId('');
    setNotes([]);
    navigate('/login');
  };

  const updateNoteHandler = () => {
    const updatedNote = {
      content: note,
      title: title,
    };
    notesService.updateNote(selectedNoteId, updatedNote);
  };

  const deleteNoteHandler = () => {
    notesService.deleteNote(selectedNoteId).then((response) => {
      console.log('response', response);
      window.location.reload();
    });
  };

  return (
    <div className="note-editor">
      <h1 className="note-editor__title">Start taking notes!</h1>
      <ReactQuill theme="snow" value={note} onChange={setNote} />
      <Box className="note-editor__button-group">
        <Button
          variant="contained"
          onClick={updateNoteHandler}
          disabled={
            note === notes.find((item) => item._id === selectedNoteId)?.content
          }
        >
          Save Notes
        </Button>
        <Button variant="outlined" onClick={deleteNoteHandler} color="error">
          Delete
        </Button>
      </Box>
      <CreateNoteModal />
    </div>
  );
};

export default Notes;
