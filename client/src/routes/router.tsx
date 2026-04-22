import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths.tsx';
import RegisterPage from '../register/register.tsx';
import HomePage from '../home/home.tsx';
import LoginPage from '../login/login.tsx';
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
      path: Paths.login,
      element: <LoginPage/>
    },
    {
      path: '*',
      element: <></>,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
