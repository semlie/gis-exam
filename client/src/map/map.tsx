import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// פתרון לבעיה ידועה שבה האייקונים של Leaflet לא מופיעים ב-React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = ({ points }) => {
  // נקודת מרכז ראשונית (למשל תל אביב)
  const position = [32.0853, 34.7818];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {points.map((point) => (
        <Marker key={`${point.user_id}-${point.time}`} position={[point.lat, point.lng]}>
          <Popup>
            <div>
              <p><strong>User ID:</strong> {point.user_id}</p>
              <p><strong>Time:</strong> {point.time}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyMap;