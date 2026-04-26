import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { getLocationsByClassId } from "../services/map.service";
import { getUserSession } from '../auth/auth.utils';
import { Paths } from '../routes/paths.tsx';
import MyMap from '../map/map.tsx'
const TeacherPage = ()=>{
  const [points, setPoints] = useState([]);
  const navigate = useNavigate();
    useEffect(
        () => {
            const user = getUserSession();
            if (!user || user.role !== 'teacher') {
              navigate(`/`);
              return;
            }

            const loadLocationsOfClass = async () => {
              try {
                const classId = user.class_id;
                const data = await getLocationsByClassId(classId);
                console.log('Loaded class locations:', data);
                setPoints(data);
              } catch (error) {
                console.error('Failed to load location:', error);
              }
            };
        
            loadLocationsOfClass();
          }, []
    )
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
        <div style={{ flex: 1, minHeight: '100vh' }}>
          <MyMap points={points} />
        </div>
      </div>
    );
};

export default TeacherPage;