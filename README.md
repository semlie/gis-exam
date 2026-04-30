## GIS Exam Project
This is a Full-Stack project for managing and displaying student locations during school trips.  

## Project Structure
server/ – Express server using SQLite and Socket.IO.  

client/ – React + Vite application for map and data display.  

## Key Features
User Authentication: Support for both teachers and students.  

Real-time Map: Displays student locations live on a map interface.  

Filtering: Option to filter and search for students by their ID.  

Live Updates: The map updates automatically when a new location is added via Socket.IO.  

Safety Alert (Bonus): Identifies students located more than 3 km away from the teacher.  

## Installation and Setup
1. Server Setup
Go to the server folder: cd server

Install dependencies: npm install

Start the server: npm start

Note: The server runs on http://localhost:4000 by default.  

2. Client Setup
Go to the client folder: cd client

Install dependencies: npm install

Start the app: npm run dev


## Technical Implementation
Database: Data is stored and managed in SQLite (server/gis_db.db).  

Coordinate Conversion: Locations are stored in DMS (Degrees, Minutes, Seconds) format and converted to Decimal for accurate map rendering.  

Real-time Communication: Socket.IO is used to handle live data updates without refreshing the page.  

## How to Use
Start the Server following the instructions above.  

Start the Client application.  

Log in as a Teacher to access the management map.  

Add a new location (via the API or test script) and observe the real-time update on the map.  

## External Dependencies
## Server Side
Node.js (v18+)  

Frameworks: Express, Socket.IO  

Database: SQLite  

Security: Bcrypt, JSONWebToken (JWT)  

Utilities: dotenv, cors  

## Client Side
Framework: React (Vite)  

Routing: React-Router  

Maps: Leaflet & React-Leaflet  

Communication: socket.io-client, axios  

## API Endpoints
GET /locations/getAllLocations – Retrieve all stored student locations.  

GET /locations/getLocationsByClassId/:class_id – Get locations for a specific class.  

POST /locations/addLocations – Add a new student location record.  

GET /locations/getAllFarStudents/:class_id/:user_id – Calculate and find students further than 3 km from the teacher.

## Screenshots

in the folder images
![תיאור התמונה](נתיב/אל/התמונה.jpg)
![image](/images)
