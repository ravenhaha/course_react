import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../../components/Header/Header';

function MainLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ py: 4 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
