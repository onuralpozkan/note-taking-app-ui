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

  const initialTitle =
    notes.find((item) => item._id === selectedNoteId)?.title || '';
  const initialNote =
    notes.find((item) => item._id === selectedNoteId)?.content || '';

  const [title, setTitle] = useState(initialTitle);

  const [note, setNote] = useState(initialNote);

  useEffect(() => {
    setNote(initialNote);
    setTitle(initialTitle);
  }, [selectedNoteId]);

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login');
    }

    if (!selectedNoteId)
      notesService.getNotes().then((res) => {
        const notesArray = res.data;
        const selectedId = Cookies.get('selectedNoteId') || selectedNoteId;
        
        if (notesArray.length === 1) {
          setSelectedNoteId(notesArray[0]._id);
        } else {
          setSelectedNoteId(
            notesArray.find((item) => item._id === selectedId)?._id || ''
          );
        }

        setNotes(notesArray);
      });
  }, []);

  const updateNoteHandler = () => {
    const updatedNote = {
      content: note,
      title: title,
    };
    notesService.updateNote(selectedNoteId, updatedNote).then(() => {
      window.location.reload();
    });
  };

  const deleteNoteHandler = () => {
    notesService.deleteNote(selectedNoteId).then(() => {
      window.location.reload();
    });
  };

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
