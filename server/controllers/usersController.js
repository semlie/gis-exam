import usersModel from "../models/usersModel.js";
import database from '../db/initDB.js';
import bcrypt from "bcrypt";
import { generateToken } from "../middleware/auth.js";

const usersController = {
  register: async (req, res) => {
    const { user_id, first_name, last_name, password, role, class_id } = req.body;
    let hash_password = null;
    if (!user_id || !first_name || !last_name || !class_id || !role) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    if (role === 'teacher' && !password) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    if (password && role === 'teacher') {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
      if (!regex.test(password)) {
        return res.status(400).json({ error: "The password must contain a lowercase letter, an uppercase letter, a special character, and numbers." });
      }
      hash_password = await bcrypt.hash(password, 10);
    }
    try {
      const result = database.prepare(usersModel.register).run(user_id, first_name, last_name, hash_password, role, class_id);
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
  },
  login: async (req,res)=>{
    const {user_id,password} = req.body
    if (!user_id|| !password)
    {
      return res.status(400).json({ error: "All required fields must be filled" });
    }
    try{
      const user = database.prepare(usersModel.getUserById).get(user_id);
      if (!user)
      {
        return res.status(400).json({ error: "Incorrect ID or password" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
      {
        return res.status(400).json({ error: "Incorrect ID or password" });
      }
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      const token = generateToken(userWithoutPassword);
      userWithoutPassword.token = token;
      res.json({ message: "Login successful", user: userWithoutPassword });
    }
    catch(err){
      console.error("Error during login:", err);
      res.status(500).json({ error: "Database error" });
    }
  }
};

export default usersController;
