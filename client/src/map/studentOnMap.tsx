import { useEffect, useState } from "react";
import MyMap from "./map";
import { getAllLocations } from "../services/map.service";

const StudentsOnMap = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await getAllLocations();
        setPoints(data);
      } catch (error) {
        console.error('Failed to load locations:', error);
      }
    };

    loadLocations();
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MyMap points={points} />
    </div>
  );
};

export default StudentsOnMap;
