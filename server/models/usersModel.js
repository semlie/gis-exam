const users={
  getAllUsers: 'SELECT * FROM users',
  getUserById: 'SELECT * FROM users WHERE user_id = ?',
  register: 'INSERT INTO users (first_name, last_name, role, class_id) VALUES (?, ?, ?, ?)',
}
export default users;