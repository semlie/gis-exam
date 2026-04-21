import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths.tsx';
import RegisterPage from '../register/register.tsx';
const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <></>,
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
