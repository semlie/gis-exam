import studentsModel from "../models/studentsModel.js";
import database from '../db/initDB.js';

const studentsController = {
  async getAllStudents(req, res) {
    try {
      const rows = database.prepare(studentsModel.getAllStudents).all('student');
      res.json(rows);
    } catch (err) {
      console.error("Error fetching students:", err);
      res.status(500).json({ error: "Error fetching students" });
    }
  }
};

export default studentsController;
