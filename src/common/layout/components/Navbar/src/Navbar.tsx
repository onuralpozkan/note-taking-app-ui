import {
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import NoteIcon from '@mui/icons-material/NoteAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useNotesStore } from '@/stores/notes.store';
import { useModalStore } from '@/stores/modal.store';

const Navbar = () => {
  const { notes, setSelectedNoteId, selectedNoteId } = useNotesStore();

  const routes = notes.map(({ title, _id }) => ({
    title,
    noteId: _id || '',
  }));

  const { toggleModal } = useModalStore();

  const createNoteHandler = () => {};

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {!!routes.length ? (
          routes.map(({ title, noteId }) => (
            <ListItem key={noteId} disablePadding>
              <ListItemButton
                onClick={() => setSelectedNoteId(noteId)}
                selected={selectedNoteId === noteId}
              >
                <ListItemIcon>
                  <TextSnippetIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>there is not any note</ListItem>
        )}

        <ListItem sx={{ position: 'fixed', width: '240px', bottom: 0 }}>
          <ListItemButton onClick={() => toggleModal(true)}>
            <ListItemText primary={'Create a note'} />
            <ListItemIcon>
              <EditNoteIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
};

export default Navbar;
