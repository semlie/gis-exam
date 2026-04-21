const users={
  getAllUsers: 'SELECT * FROM users',
  getUserById: 'SELECT * FROM users WHERE user_id = ?',
  register: 'INSERT INTO users (user_id,first_name, last_name, role, class_id) VALUES (?, ?, ?, ?,?)',
  getAllStudents: 'SELECT * FROM users WHERE role = ?',

}
export default users;