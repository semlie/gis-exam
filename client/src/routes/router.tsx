import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths.tsx';
import RegisterPage from '../register/register.tsx';
import HomePage from '../home/home.tsx';
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage/>,
    },
    {
      path: Paths.register,
      element: <RegisterPage/>,
    },
    {
      path: '*',
      element: <></>,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
