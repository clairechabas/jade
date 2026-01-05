import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from '../layouts';
import { HomeScreen } from '../screens';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomeScreen />,
      },
    ],
  },
]);
