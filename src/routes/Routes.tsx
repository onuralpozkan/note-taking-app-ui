import Login from '@/pages/Login';
import Notes from '@/pages/Notes';
import Register from '@/pages/Register';
import Layout from '@/common/layout/Layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <Notes />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
