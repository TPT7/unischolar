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

// User login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.status(200).json({ user: result.rows[0], message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server error');
  }
});


app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.status(201).json({ user: result.rows[0], message: 'Acoount created successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Server error');
  }
});


//Save question endpoint
app.post('/api/questions', async (req, res) => {
  const { question} = req.body;
  try {
    console.log('Received question:', { question });
    const result = await pool.query('INSERT INTO questions (question) VALUES ($1) RETURNING question_id', [question]);
    alert('Question saved, ID:', result.rows[0].question_id);
    res.status(201).json({ id: result.rows[0].question_id });
  } catch (error) {
    console.error('Error inserting question:', error);
    res.status(500).send('Server error');
  }
});

app.post('/api/comments', async (req, res) => {
  const { comment,question_id} = req.body;
  try {
    console.log('Received comment:', { comment,question_id});
    await pool.query('INSERT INTO comments (comment,question_id) VALUES ($1,$2) RETURNING comment_id', [comment,question_id]);
    alert('Comment saved');
    res.status(201).send('Comment added');
  } catch (error) {
    console.error('Error inserting comment:', error);
    res.status(500).send('Server error');
  }
});


// Fetch questions and comments for a specific user
app.get('/api/users/:userId/questions', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query(`
      SELECT q.question_id, q.question, c.comment, c.date
      FROM questions q
      LEFT JOIN comments c ON q.question_id = c.question_id
      WHERE q.user_id = $1
      ORDER BY q.question_id, c.date;
    `, [user_id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Server error');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
