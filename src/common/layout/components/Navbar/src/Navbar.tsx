import {
  List,
  Toolbar,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useNotesStore } from '@/stores/notes.store';
import { useModalStore } from '@/stores/modal.store';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

type Navbar = {
  setMobile: (arg: boolean) => void;
};

const Navbar = ({ setMobile }: Navbar) => {
  const { notes, setSelectedNoteId, selectedNoteId } = useNotesStore();
  const navigate = useNavigate();
  const routes = notes.map(({ title, _id }) => ({
    title,
    noteId: _id || '',
  }));

  const { toggleModal } = useModalStore();

  const noteSelectHandler = (noteId: string) => {
    const pathname = window.location.pathname;
    Cookies.set('selectedNoteId', noteId);

    if (pathname !== 'notes') {
      navigate('/');
    }

    setSelectedNoteId(noteId);
  };

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {!!routes.length ? (
          routes.map(({ title, noteId }) => (
            <ListItem key={noteId} disablePadding>
              <ListItemButton
                onClick={() => {
                  setMobile(false);
                  noteSelectHandler(noteId);
                }}
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
          <ListItem>Note list is empty!</ListItem>
        )}

        <ListItem sx={{ position: 'fixed', width: '240px', bottom: 0 }}>
          <ListItemButton
            onClick={() => {
              const pathname = window.location.pathname;

              if (pathname !== 'notes') {
                navigate('/');
              }
              setMobile(false);
              toggleModal(true);
            }}
          >
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
