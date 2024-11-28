// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'unischolar',
  password: 'admin',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
  res.status(201).json(result.rows[0]);
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.post('/api/questions', async (req, res) => {
  const { question } = req.body;
  try {
    const result = await pool.query('INSERT INTO questions (question) VALUES ($1) RETURNING *', [question]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/comments', async (req, res) => {
    const { comment } = req.body;
    try {
      const result = await pool.query('INSERT INTO comments (comment) VALUES ($1) RETURNING *', [comment]);
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting comment:', error);
      res.status(500).send('Server error');
    }
  });

  app.get('/api/questions', async (req, res) => {
    try {
      const result = await pool.query(`
        SELECT q.question, c.comment, c.date
        FROM questions q
        LEFT JOIN comments c ON q.question_id = c.question_id
        ORDER BY q.question_id, c.date;
      `);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).send('Server error');
    }
  });
  
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
