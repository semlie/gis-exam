import { RouterProvider, createBrowserRouter } from 'react-router';
import { Paths } from './paths.tsx';
import RegisterPage from '../register/register.tsx';
import HomePage from '../home/home.tsx';
import LoginPage from '../login/login.tsx';
import TeacherPage from '../teacherPage/teacherPage.tsx';
import FarStudents from '../teacherPage/farStudents.tsx';
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
      path : Paths.teacherPage,
      element : <TeacherPage/>
    },
    {
      path : Paths.farStudents,
      element : <FarStudents/>
    },
    {
      path: '*',
      element: <></>,
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
