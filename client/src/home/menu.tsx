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
          onClick={() => navigate(`/${Paths.register}`)}
          style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          התחברות למורים
        </button>
        <div className="search-container">
                 <Search className="search-icon" size={20} />
                <input type="text" placeholder={"חפש תלמיד לפי תעודת זהות"} className="search-input" />
            </div>
      </div>

      {/* מודל התפריט (Menu Modal) */}
      {isMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ width: '90%', maxWidth: '560px', background: '#fff', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.15)' }}>
            <div style={{ background: '#000', color: '#fff', padding: '24px', position: 'relative' }}>
              <button
                onClick={() => setIsMenuOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
              <h1 style={{ margin: 0 }}>רישום</h1>
            </div>
            <div style={{ padding: '24px' }}>
              <p>טופס רישום יופיע כאן.</p>
            </div>
          </div>
        </div>
      )}

      {/* מודל יצירת קשר (Contact Modal) */}
      {isContactOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ width: '90%', maxWidth: '500px', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 45px rgba(0,0,0,0.15)' }}>
            <div style={{ background: '#000', color: '#fff', padding: '24px', position: 'relative' }}>
              <button
                onClick={() => setIsContactOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
              >
                ×
              </button>
              <h1 style={{ margin: 0 }}>התחברות למורים</h1>
            </div>
            <div style={{ padding: '24px', display: 'grid', gap: '16px' }}>
              <p>כאן תוכל להתחבר כמורה.</p>
              <form style={{ display: 'grid', gap: '12px' }}>
                <input style={{ padding: '12px', border: '1px solid #ccc', borderRadius: '8px' }} type="text" placeholder="שם" />
                <button type="button" style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}>
                  התחבר
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Menu;