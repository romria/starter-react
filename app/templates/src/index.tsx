import React from 'react';
import {createRoot} from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './assets/fonts/fonts.css';
import './index.scss';
import Root from './routes/root';
import Child from './routes/child';
import NotFound from './routes/not-found-404';

const rootElement = document.getElementById('root');
if (rootElement === null) throw new Error('Failed to find the root element');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/child',
        element: <Child />,
      },
    ],
  },
]);

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
