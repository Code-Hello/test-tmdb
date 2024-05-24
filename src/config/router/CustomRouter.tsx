import MainLayout from '@components/layouts/MainLayout';
import Home from '@components/pages/Home';
import Oops from '@components/pages/Oops';
import { createBrowserRouter } from 'react-router-dom';
import RoutePath from './routePath';

const CustomRouter = createBrowserRouter([
  {
    path: RoutePath.Home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: RoutePath.Oops,
    element: <Oops />,
  },
]);

export default CustomRouter;
