import React, { FormEvent, useEffect, useState } from 'react';
import './login.css';
import { getClasses } from '../services/classes.service';
import { register } from '../services/auth.service';

const LoginPage: React.FC = () => {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());
    const payload = {
      user_id: String(rawData.user_id),
      first_name: String(rawData.first_name),
      last_name: String(rawData.last_name),
      role: String(rawData.role),
      class_id: Number(rawData.class_id),
    };

    console.log('Payload Submitted:', payload);
    const result = await register(payload);
    console.log('Register result:', result);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>התחברות</h2>
        <div className="input-group">
          <input type="text" name="user_id" placeholder="תעודת זהות" required />
        </div>
        <button type="submit" className="submit-button">
         כניסה 
        </button>
      </form>
    </div>
  );
};

export default LoginPage;