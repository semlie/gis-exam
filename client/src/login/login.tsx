import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import './login.css';
import { login } from '../services/auth.service';
import { setSession } from '../auth/auth.utils';
import { Paths } from '../routes/paths.tsx';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const payload = {
      user_id: String(rawData.user_id),
      password: String(rawData.password)
    };

    const result = await login(payload);
    const user = result?.user;
    if (user) {
      setSession(user.token, user);
      if (user.role === 'teacher') {
        navigate(`/${Paths.teacherPage}`);
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>התחברות</h2>
        <div className="input-group">
          <input type="text" name="user_id" placeholder="תעודת זהות" required />
          <input type="password" name="password" placeholder="סיסמה" required/>
        </div>
        <button type="submit" className="submit-button">
         כניסה 
        </button>
      </form>
    </div>
  );
};

export default LoginPage;