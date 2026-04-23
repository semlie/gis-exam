const classes = {
  getAllClasses: "select * from classes",
  addClass:"Insert into classes (class_name) VALUES (?)",
  getClassIdByClassId : 'SELECT class_id FROM classes WHERE class_id = ?'
};
export default classes;