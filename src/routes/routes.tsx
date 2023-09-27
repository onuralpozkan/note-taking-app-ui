import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// const DashboardPage = lazy(() => import('@/pages/Dashboard'));
// const UsersPage = lazy(() => import('@/pages/Users'));
// const RolesPage = lazy(() => import('@/pages/Roles'));

export const router = createBrowserRouter([
  {
    element: <div>Test</div>,
    path: '/'
  },
]);
