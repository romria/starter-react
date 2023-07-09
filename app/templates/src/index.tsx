import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './assets/fonts/Inter/inter.scss';
import './reset.scss';
import './index.scss';
import {AppContextProvider} from './state';
import MainLayout from './layouts/main';
import Index from './routes/index';
import Login from './routes/login';
import RouteError from './routes/route-error';
import Dashboard from './routes/dashboard';
import DashboardIndex from './routes/dashboard-index';
import DashboardUsers from './routes/dashboard-users';
import DashboardReports from './routes/dashboard-reports';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Failed to find the root element');

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <MainLayout><RouteError /></MainLayout>,
    children: [
      {index: true, element: <Index />},
      {path: '/login', element: <Login />},
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {index: true, element: <DashboardIndex />},
          {path: '/dashboard/users', element: <DashboardUsers />},
          {path: '/dashboard/reports', element: <DashboardReports />},
        ],
      },
    ],
  },
  // {
  //   path: '*',
  //   element: <Navigate to="/" replace />,
  // },
]);

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
);
