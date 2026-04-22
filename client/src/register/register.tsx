import React, { FormEvent, useEffect, useState } from 'react';
import './register.css';
import { getClasses } from '../services/classes.service';
import { register } from '../services/auth.service';

const RegisterPage: React.FC = () => {
  const [classes, setClasses] = useState<Array<{ class_id: number; class_name: string }>>([]);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await getClasses();
        setClasses(data);
      } catch (error) {
        console.error('Failed to load classes:', error);
      }
    };

    loadClasses();
  }, []);
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
        <h2>הרשמה</h2>
        <div className="input-group">
          <input type="text" name="first_name" placeholder="שם פרטי" required />
          <input type="text" name="last_name" placeholder="שם משפחה" required />
          <input type="text" name="user_id" placeholder="תעודת זהות" required />
        </div>
        <div className="input-group" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
          <span>בחר תפקיד:</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="radio" name="role" value="student" required />
            תלמיד
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="radio" name="role" value="teacher" required />
            מורה
          </label>
        </div>
        <div className="input-group">
          <label htmlFor="class_id">בחר כיתה:</label>
          <select id="class_id" name="class_id" defaultValue="">
            <option value="" disabled>בחר מהרשימה...</option>
            {classes.map((cls) => (
              <option key={cls.class_id} value={cls.class_id}>
                {cls.class_name}
              </option>
            ))}
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