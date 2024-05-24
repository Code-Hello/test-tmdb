import CustomRouter from '@config/router/CustomRouter';
import { RouterProvider } from 'react-router-dom';

export default function App() {
  return <RouterProvider router={CustomRouter} />;
}
