import React, { FormEvent } from 'react';
import './register.css';

const RegisterPage: React.FC = () => {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Form Data Submitted:', data);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>הרשמה</h2>
        <div className="input-group">
          <input type="text" name="first_name" placeholder="שם פרטי" required />
          <input type="text" name="last_name" placeholder="שם משפחה" required />
          <input type="text" name="id" placeholder="תעודת זהות" required />
        </div>
        <div className="input-group">
          <label htmlFor="class">בחר כיתה:</label>
          <select id="class" name="class" defaultValue="">
            <option value="" disabled>בחר מהרשימה...</option>
            <option value="v1">ו1</option>
            <option value="v2">ו2</option>
            <option value="v3">ו3</option>
            <option value="v4">ו4</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          שליחת טופס
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;