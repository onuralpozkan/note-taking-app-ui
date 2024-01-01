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
import { useNotesStore } from '@/stores/notes.store';

const Navbar = () => {
  const { notes, setSelectedNoteId, selectedNoteId } = useNotesStore();

  const routes = notes.map(({ title, _id }) => ({
    title,
    noteId: _id || '',
  }));

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
                  <NoteIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <ListItem>there is not any note</ListItem>
        )}
      </List>
      <Divider />
    </div>
  );
};

export default Navbar;
