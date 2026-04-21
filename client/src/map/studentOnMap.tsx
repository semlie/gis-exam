import { useEffect, useState } from "react";
import MyMap from "./map";

const StudentsOnMap =()=>{

const [points, setPoints] = useState([]);

useEffect(() => {
    // קריאה ל-API שלך שמחזיר את הנתונים מה-SQLite
    fetch('/api/locations')
        .then(res => res.json())
        .then(data => setPoints(data));
}, []);

return <MyMap points={points} />;
}

export default StudentsOnMap;
