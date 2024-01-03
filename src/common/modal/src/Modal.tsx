import { useState } from 'react';
import { useModalStore } from '@/stores/modal.store';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NotesService from '@/services/NotesService';
import { useNotesStore } from '@/stores/notes.store';
import './modal.css';

const CreateNoteModal = () => {
  const notesService = new NotesService();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { isModalOpen, toggleModal } = useModalStore();
  const { setSelectedNoteId, setNotes } = useNotesStore();
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };
  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  };

  const createNoteHandler = () => {
    if (!content.trim() || !title.trim()) {
      alert('Title and content field required for creating a note');
      return;
    }
    const newNote = {
      content: content,
      title: title,
    };
    notesService
      .saveNote(newNote)
      .then(() => {
        notesService.getNotes().then((res) => {
          const notesArray = res.data;
          setSelectedNoteId(res.data[res.data.length - 1]?._id || '');
          setNotes(notesArray);
        });
      })
      .then(() => {
        toggleModal(false);
      });
  };

  return (
    <Modal
      open={isModalOpen}
      onClose={() => toggleModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="modal-box">
        <Box sx={rowStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a note!
          </Typography>
          <Button variant="text" onClick={() => toggleModal(false)}>
            <CloseIcon />
          </Button>
        </Box>
        <TextField
          id="standard-basic"
          label="Note title"
          variant="standard"
          sx={{ width: '100%' }}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Create your note..."
        />
        <Box
          sx={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 0' }}
        >
          <Button
            variant="contained"
            disableElevation
            onClick={createNoteHandler}
          >
            Create note!
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateNoteModal;
