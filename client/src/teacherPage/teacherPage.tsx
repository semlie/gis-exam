import { useEffect, useState } from "react";
import { useNavigate } from 'react-router';
import { io } from "socket.io-client";
import { getLocationsByClassId } from "../services/map.service";
import { getUserSession } from '../auth/auth.utils';
import MyMap from '../map/map.tsx'
import TeacherMenu from './teacherMenu.tsx'
const TeacherPage = ()=>{
  // מצב של נקודות המיקום להצגה במפה
  const [points, setPoints] = useState<any[]>([]);
  const navigate = useNavigate();
    useEffect(
        () => {
            const user = getUserSession();
            if (!user || user.role !== 'teacher') {
              // אם לא מורה, מפנים חזרה לדף הראשי
              navigate(`/`);
              return;
            }

            const loadLocationsOfClass = async () => {
              try {
                const classId = user.class_id;
                const data = await getLocationsByClassId(classId);
                console.log('Loaded class locations:', data);
                // מעדכנים את נקודות המפה עם המיקומים מהכיתה
                setPoints(data);
              } catch (error) {
                console.error('Failed to load location:', error);
              }
            };

            // חיבור ל־Socket.IO לקבלת עדכוני מיקום חיים
            const socket = io("http://localhost:4000");
            socket.on("studentLocationUpdate", (data) => {
              console.log("New location received:", data);
              setPoints((prev) => {
                const exists = prev.some((point: any) => point.user_id === data.user_id);
                if (exists) {
                  // אם התלמיד כבר קיים, מעדכנים את הרשומה
                  return prev.map((point: any) => (point.user_id === data.user_id ? data : point));
                }
                // אם התלמיד חדש, מוסיפים אותו לרשימת הנקודות
                return [...prev, data];
              });
            });

            loadLocationsOfClass();

            return () => {
              // ניתוק חיבור ה־Socket כאשר הרכיב יורד מהדף
              socket.disconnect();
            };
          }, [navigate]
    )
    return (
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex' }}>
        <TeacherMenu/>
        <main style={{ flex: 1, minHeight: '100vh' }}>
          <MyMap points={points} />
        </main>
      </div>
    );
};
export default TeacherPage;