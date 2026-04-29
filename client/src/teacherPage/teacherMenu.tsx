import { useNavigate } from 'react-router';
import { Paths } from '../routes/paths';
import { removeSession } from '../auth/auth.utils';
const TeacherMenu = () => {

  const navigate =  useNavigate();
  return (
    <aside style={{ width: '280px', minHeight: '100vh', borderRight: '1px solid #ddd', background: '#f8f9fa', padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => navigate(`/${Paths.farStudents}`)}
          style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          הצגת כל התלמידים הרחוקים ממני
        </button>
        <button
          onClick={() => {removeSession(); navigate("/")}}
          style={{ padding: '12px 16px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '8px' }}
        >
          התנתקות
        </button>
      </div>
    </aside>
  );
};

export default TeacherMenu;