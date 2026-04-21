 import usersModel from "../models/usersModel.js";
 import  DB from '../dal/db_client.js';
 const usersController = {
   register: async (req, res) => {
     const { first_name,last_name, role ,class_id} = req.body;
    if (!first_name || !last_name || !class_id || !role) {
      return res.status(400).json({ error: "All required fields must be filled" });
     }
    try {
       const [result] = await DB.execute(usersModel.register,[first_name, last_name, role, class_id]);
      if (result.affectedRows === 0)
          {
         return res.status(500).json({ error: "Error registering user" });
       }
      res.status(201).json({ message: "User registered successfully", userId: result.insertId });
     } catch (err) {
       console.error("Error adding the user to the database:", err);
       res.status(500).json({ error: "Error adding the user" });
     }
   }
 }
 export default usersController;