const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3001;

app.use(express.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'postgres',
  password: 'DB@1234',
  port: 5432,
});

app.post('/users', async (req, res) => {
  const { username, email } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
      [username, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`User Management Service is running on port ${port}`);
});

module.exports = app;
