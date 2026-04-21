import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('gis_db.db');

const classes = `CREATE TABLE IF NOT EXISTS classes(
                 class_id INTEGER PRIMARY KEY AUTOINCREMENT,
                 class_name TEXT
                ) STRICT;`;

const users = `CREATE TABLE IF NOT EXISTS users(
               user_id TEXT PRIMARY KEY,
               first_name TEXT,
               last_name TEXT,
               role TEXT CHECK(role IN ('student', 'teacher')),
               class_id INTEGER,
               FOREIGN KEY (class_id) REFERENCES classes(class_id)
               ) STRICT;`;

const locations = `CREATE TABLE IF NOT EXISTS locations (
        user_id TEXT,
        time TEXT,
        coordinates TEXT,
        PRIMARY KEY (user_id, time),
        FOREIGN KEY (user_id) REFERENCES users(user_id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE)`;
            
try {
  database.exec(classes);
  database.exec(users);
  database.exec(locations)
} catch (err) {
  console.error("❌ Error creating tables:", err.message);
}

export default database;
