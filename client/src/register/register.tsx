import React, { FormEvent, useEffect, useState } from 'react';
import './register.css';
import { getClasses } from '../services/classes.service';
import { register } from '../services/auth.service';

const RegisterPage: React.FC = () => {
  const [classes, setClasses] = useState<Array<{ class_id: number; class_name: string }>>([]);
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');

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

    const classIdValue = String(rawData.class_id ?? '').trim();
    if (!classIdValue) {
      alert('יש לבחור כיתה');
      return;
    }

    const payload = {
      user_id: String(rawData.user_id),
      first_name: String(rawData.first_name),
      last_name: String(rawData.last_name),
      role,
      class_id: Number(classIdValue),
      ...(role === 'teacher' ? { password } : {}),
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
            <input type="radio" name="role" value="student" checked={role === 'student'} onChange={() => setRole('student')} required />
            תלמיד
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="radio" name="role" value="teacher" checked={role === 'teacher'} onChange={() => setRole('teacher')} required />
            מורה
          </label>
        </div>
        {role === 'teacher' && (
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="סיסמה"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        )}
        <div className="input-group">
          <label htmlFor="class_id">בחר כיתה:</label>
          <select id="class_id" name="class_id" defaultValue="" required>
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