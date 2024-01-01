import { useState, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Drawer, CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '@/common/layout/components/Navbar';
import Appbar from '@/common/layout/components/Appbar';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function Layout(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    maxWidth: '100%',
    width: '100%',
    paddingTop: '5rem',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Suspense fallback="Loading...">
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Appbar
          drawerWidth={drawerWidth}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
          >
            <Navbar />
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
              },
            }}
            open
          >
            <Navbar />
          </Drawer>
        </Box>
        <StyledBox
          component="main"
          sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Outlet />
        </StyledBox>
      </Box>
    </Suspense>
  );
}
