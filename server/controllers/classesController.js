import classesModel from "../models/classesModel.js";
import database from '../db/initDB.js';

const classesController = {
  addClass: async (req, res) => {
    const {class_name } = req.body;
    if (!class_name) {
      return res.status(400).json({ error: "All required fields must be filled" });
    }

    try {
      const result = database.prepare(classesModel.addClass).run(class_name);
      if (!result || result.changes === 0) {
        return res.status(500).json({ error: "Error adding class" });
      }
      const classId = result.lastInsertRowid || result.lastInsertROWID || null;
      res.status(201).json({ message: "Class added successfully", classId });
    } catch (err) {
      console.error("Error adding the class to the database:", err);
      res.status(500).json({ error: "Error adding the class" });
    }
  },
  getAllClasses: async (req, res)=> {
    try {
      const rows = database.prepare(classesModel.getAllClasses).all();
      res.json(rows);
    } catch (err) {
      console.error("Error fetching classes:", err);
      res.status(500).json({ error: "Error fetching classes" });
    }
  }
};

export default classesController;
