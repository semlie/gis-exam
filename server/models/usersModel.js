const users={
  getAllUsers: 'SELECT * FROM users',
  getUserById: 'SELECT * FROM users WHERE user_id = ?',
  register: 'INSERT INTO users (user_id, first_name, last_name, password, role, class_id) VALUES (?, ?, ?, ?, ?, ?)',
  getAllStudents: 'SELECT * FROM users WHERE role = ?',
  getRoleById: 'SELECT role FROM users WHERE user_id = ?'
  //login: 'SELECT * FROM users WHERE user_id = ? and password = ?',
}
export default users;