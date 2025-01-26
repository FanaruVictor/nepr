const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// SQLite setup
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(
      `CREATE TABLE IF NOT EXISTS User (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        mail TEXT NOT NULL UNIQUE,
        type TEXT DEFAULT 'User',
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        } else {
          console.log('User table ready.');
        }
      }
    );
  }
});

// Endpoint: User signup
app.post('/signup', async (req, res) => {
  const { username, mail, password } = req.body;

  // Validate input
  if (!username || !mail || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    db.run(
      `INSERT INTO User (username, mail, password) VALUES (?, ?, ?)`,
      [username, mail, hashedPassword],
      (err) => {
        if (err) {
          console.error('Error inserting user:', err.message);
          if (err.message.includes('UNIQUE')) {
            return res.status(409).json({ error: 'Username or email already exists.' });
          }
          return res.status(500).json({ error: 'Internal server error.' });
        }
        res.status(201).json({ message: 'User created successfully.' });
      }
    );
  } catch (err) {
    console.error('Error hashing password:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/users', (req, res) => {
    db.all(`SELECT id, username, mail, type FROM User`, [], (err, rows) => {
      if (err) {
        console.error('Error fetching users:', err.message);
        return res.status(500).json({ error: 'Internal server error.' });
      }
      res.json(rows);
    });
  });
  
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
  
    db.get(`SELECT id, username, mail, type FROM User WHERE id = ?`, [id], (err, row) => {
      if (err) {
        console.error('Error fetching user:', err.message);
        return res.status(500).json({ error: 'Internal server error.' });
      }
      if (!row) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(row);
    });
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
