import React, { useState } from 'react';
import {Navigation, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
const Menu = () => {
  // ניהול מצב המודלים (פתוח/סגור)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate =  useNavigate();
  return (
    <aside style={{ width: '280px', minHeight: '100vh', borderRight: '1px solid #ddd', background: '#f8f9fa', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => navigate(`/${Paths.register}`)}
          style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          רישום
        </button>
        <button
          onClick={() => navigate(`/${Paths.login}`)}
          style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          התחברות למורים
        </button>
      </div>
    </aside>
  );
};

export default Menu;