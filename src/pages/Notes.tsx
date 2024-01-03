import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NotesService from '@/services/NotesService';
import { useNotesStore } from '@/stores/notes.store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './notes.css';
import { Box, Button } from '@mui/material';

const Notes = () => {
  const navigate = useNavigate();
  const notesService = new NotesService();
  const { setNotes, selectedNoteId, setSelectedNoteId, notes } =
    useNotesStore();
  const [title, setTitle] = useState(
    notes.filter((item) => item._id === selectedNoteId)[0]?.title || ''
  );

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
        const notesArray = res.data;
        setSelectedNoteId(res.data[0]._id);
        setNotes(notesArray);
        console.log({ res });
      });
  }, []);

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

  console.log({
    note,
    noteFromDb: notes.find((item) => item._id === selectedNoteId)?.content,
  });

  if (!notes.length)
    return (
      <div className="note-editor">
        <h1 className="note-editor__title">No notes have been created yet!</h1>
      </div>
    );

  return (
    <div className="note-editor">
      <h1 className="note-editor__title">Start taking notes!</h1>
      <ReactQuill theme="snow" value={note} onChange={setNote} />
      <Box className="note-editor__button-group">
        <Button
          variant="contained"
          onClick={updateNoteHandler}
          disabled={notes
            .find((item) => item._id === selectedNoteId)
            ?.content.includes(note)}
        >
          Save Notes
        </Button>
        <Button variant="outlined" onClick={deleteNoteHandler} color="error">
          Delete
        </Button>
      </Box>
    </div>
  );
};

export default Notes;
