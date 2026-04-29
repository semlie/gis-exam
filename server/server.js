import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import users from "./routers/usersRoutes.js";
import locations from './routers/locationsRoutes.js'; 
import classes from './routers/classesRoutes.js'
import { createSocket } from './sockets/appSocket.js';
dotenv.config();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/locations", locations);
app.use("/classes",classes);
app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('To start the server, run: npm run start_server');
  console.log('To stop the server, run: npm run stop');
});
createSocket(server);
