import usersModel from "../models/usersModel.js";
import database from '../db/initDB.js';

const usersController = {
  register: async (req, res) => {
    const { user_id, first_name, last_name, role, class_id } = req.body;
    if (!user_id || !first_name || !last_name || !class_id || !role) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    try {
      const result = database.prepare(usersModel.register).run(user_id, first_name, last_name, role, class_id);
      if (!result || result.changes === 0) {
        return res.status(500).json({ error: "Error registering user" });
      }
      res.status(201).json({ message: "User registered successfully", userId: user_id });
    } catch (err) {
      console.error("Error adding the user to the database:", err);
      res.status(500).json({ error: "Error adding the user" });
    }
  },
  getAllStudents: async (req, res)=> {
    try {
      const rows = database.prepare(usersModel.getAllStudents).all('student');
      res.json(rows);
    } catch (err) {
      console.error("Error fetching students:", err);
      res.status(500).json({ error: "Error fetching students" });
    }
  }
};

export default usersController;
