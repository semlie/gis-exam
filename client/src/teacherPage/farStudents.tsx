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
                <p>No far students found.</p>
            ) : (
                <ul>
                    {students.map((student: any) => (
                        <li key={student.user_id}>
                            {student.user_id} - {student.role} - {student.lat}, {student.lng}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default FarStudents;