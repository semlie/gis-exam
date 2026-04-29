import { useEffect, useState } from "react";
import { getUserSession } from "../auth/auth.utils";
import { getAllFarStudents } from "../services/map.service";
import { useNavigate } from "react-router";

const FarStudents = ()=>{
    const [students,setStudents] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const user = getUserSession();
        if (!user || user.role !== 'teacher') {
              navigate(`/`);
              return;
            }
        const fetchFarStudents = async () => {
            try {
                const data = await getAllFarStudents(user.class_id, user.user_id);
                setStudents(data);
            } catch (error) {
                console.error('Failed to load students:', error);
            }
        };

        fetchFarStudents();
    }, [navigate]);

    return (
        <div>
            <h2>Far Students</h2>
            {students.length === 0 ? (
                <p>לא נמצאו תלמידים רחוקים כעת.</p>
            ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                    {students.map((student: any) => (
                        <div
                            key={student.user_id}
                            style={{
                                padding: '16px',
                                border: '1px solid #dcdcdc',
                                borderRadius: '12px',
                                backgroundColor: '#f7f9fc',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                            }}>
                            <h3 style={{ margin: '0 0 8px 0' }}>{student.full_name}</h3>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>ת"ז:</strong> {student.user_id}</p>
                            <p style={{ margin: '4px 0', color: '#555' }}><strong>מרחק:</strong> {student.distance_km} ק"מ</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default FarStudents;