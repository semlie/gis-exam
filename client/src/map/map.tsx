import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// אייקון של המורה
const TeacherIcon = L.divIcon({
  className: '',
  html: '<div style="width: 20px; height: 20px; border-radius: 50%; background: red; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const MyMap = ({ points }) => {
  // נקודת מרכז ראשונית של המפה
  const position = [32.0853, 34.7818];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* יצירת Marker לכל נקודת מיקום שמתקבלת ב-props */}
      {points.map((point) => {
        const role = String(point.role ?? '').trim().toLowerCase();
        const isTeacher = role === 'teacher';

        return (
          <Marker
            key={`${point.user_id}-${point.time}`}
            position={[point.lat, point.lng]}
            icon={isTeacher ? TeacherIcon : DefaultIcon}
          >
            <Popup>
              <div>
                <p><strong>User ID:</strong> {point.user_id}</p>
                <p><strong>Role:</strong> {point.role ?? 'unknown'}</p>
                <p><strong>Time:</strong> {point.time}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MyMap;