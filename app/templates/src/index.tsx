import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './assets/fonts/fonts.css';
import './reset.scss';
import './index.scss';
import {AppContextProvider} from './state';
import Root from './routes/root';
import Login from './routes/login';
import RouteNotFound from './routes/route-not-found';
import Dashboard from './routes/dashboard';
import DashboardUsers from './routes/dashboard-users';
import DashboardReports from './routes/dashboard-reports';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Failed to find the root element');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RouteNotFound />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          {
            path: '/dashboard/users',
            element: <DashboardUsers />,
          },
          {
            path: '/dashboard/reports',
            element: <DashboardReports />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
        children: [],
      },
    ],
  },
]);

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  </StrictMode>,
);
