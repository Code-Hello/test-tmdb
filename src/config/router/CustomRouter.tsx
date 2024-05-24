import MainLayout from '@components/layouts/MainLayout';
import Home from '@components/pages/Home';
import Oops from '@components/pages/Oops';
import { createBrowserRouter } from 'react-router-dom';
import RoutePath from './routePath';
import Movie from '@/components/organisms/Movie';

const CustomRouter = createBrowserRouter([
  {
    path: RoutePath.Home,
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: RoutePath.Movie,
        children: [
          {
            path: ':id',
            element: <Movie />,
          },
        ],
      },
    ],
  },
  {
    path: RoutePath.Oops,
    element: <Oops />,
  },
]);

export default CustomRouter;
