import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNotesStore } from '@/stores/notes.store';
import { useEffect, useState } from 'react';

interface AppbarProps extends MuiAppBarProps {
  drawerWidth: number;
  handleDrawerToggle?: () => void;
}

const Appbar = (props: AppbarProps) => {
  const { handleDrawerToggle, drawerWidth } = props;

  const [noteTitle, setNoteTitle] = useState('');
  const { notes, selectedNoteId } = useNotesStore();

  useEffect(() => {
    const selectedNoteTitle = notes.find(
      (item) => item._id === selectedNoteId
    )?.title;
    console.log({ selectedNoteTitle });
    setNoteTitle(selectedNoteTitle || 'Yükleniyor...');
  }, [selectedNoteId]);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {noteTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
