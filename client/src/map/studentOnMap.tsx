import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MyMap from "./map";
import { getAllLocations } from "../services/map.service";

const StudentsOnMap = () => {
  const [points, setPoints] = useState([]);
  const [filterId, setFilterId] = useState('');

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await getAllLocations();
        setPoints(data);
      } catch (error) {
        console.error('Failed to load locations:', error);
      }
    };

    const socket = io("http://localhost:4000");

    socket.on("studentLocationUpdate", (data) => {
      console.log("New location received:", data);
      setPoints((prev) => {
        const exists = prev.some((point: any) => point.user_id === data.user_id);
        if (exists) {
          return prev.map((point: any) => (point.user_id === data.user_id ? data : point));
        }
        return [...prev, data];
      });
    });

    loadLocations();

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredPoints = filterId
    ? points.filter((point) => String(point.user_id).includes(filterId.trim()))
    : points;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ padding: '12px', background: '#fff', borderBottom: '1px solid #ddd' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          סנן לפי ת"ז:
          <input
            type="text"
            value={filterId}
            onChange={(e) => setFilterId(e.target.value)}
            placeholder="הקלד תעודת זהות"
            style={{ padding: '8px 10px', borderRadius: '8px', border: '1px solid #ccc', minWidth: '200px' }}
          />
        </label>
      </div>
      <div style={{ height: 'calc(100% - 56px)', width: '100%' }}>
        <MyMap points={filteredPoints} />
      </div>
    </div>
  );
};

export default StudentsOnMap;
