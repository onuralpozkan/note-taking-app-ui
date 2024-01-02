import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNotesStore } from '@/stores/notes.store';
import { useEffect, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface AppbarProps extends MuiAppBarProps {
  drawerWidth: number;
  handleDrawerToggle?: () => void;
}

const Appbar = (props: AppbarProps) => {
  const { handleDrawerToggle, drawerWidth } = props;

  const { setNotes, setSelectedNoteId } = useNotesStore();
  const navigate = useNavigate();
  const [noteTitle, setNoteTitle] = useState('');
  const { notes, selectedNoteId } = useNotesStore();

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setSelectedNoteId('');
    setNotes([]);
    navigate('/login');
  };

  useEffect(() => {
    const selectedNoteTitle = notes.find(
      (item) => item._id === selectedNoteId
    )?.title;

    const isHomePage = window.location.pathname === '/';
    console.log(window.location.pathname, isHomePage);
    if (isHomePage) {
      setNoteTitle(selectedNoteTitle || 'Loading...');
    } else {
      setNoteTitle("Note takin' app");
    }
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
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {noteTitle}
        </Typography>
        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
