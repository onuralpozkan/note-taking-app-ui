import { Box, Paper } from '@mui/material';
import Cookies from 'js-cookie';

const Profile = () => {
  const username = Cookies.get('username');
  return (
    <Box sx={{ padding: '0 1rem', width: '100%' }}>
      <Paper variant="elevation" elevation={3} sx={{ padding: '2rem' }}>
        <strong>User:</strong> {username}
      </Paper>
    </Box>
  );
};

export default Profile;
