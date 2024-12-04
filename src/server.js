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
  const { username, password, programme } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username, password, programme) VALUES ($1, $2, $3) RETURNING *', [username, password, programme]);
    res.status(201).json({ user: result.rows[0], message: 'Acoount created successful' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send('Server error');
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT user_id, programme, username FROM users');
    res.json(result.rows); 
  } catch (err) {
    console.error('Database query error:', err); 
    res.status(500).send('Error fetching users');
  }
});

app.post('/api/questions', async (req, res) => {
  const { question, user_id } = req.body;

  try {
    if (!user_id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    console.log('Received question:', { question, user_id });

    const result = await pool.query(
      'INSERT INTO questions (question, user_id) VALUES ($1, $2) RETURNING question_id',
      [question, user_id]
    );

    console.log('Question saved, ID:', result.rows[0].question_id);

    res.status(201).json({ id: result.rows[0].question_id });
  } catch (error) {
    console.error('Error inserting question:', error);

    res.status(500).send('Server error');
  }
});

app.post('/api/comments', async (req, res) => {
  const { question_id,comment } = req.body;

  if (!question_id || !comment) {
    return res.status(400).json({ error: 'question_id and comment are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO comments (question_id, comment) VALUES ($1, $2) RETURNING question_id, comment, date',
      [question_id, comment] 
    );

    const newComment = result.rows[0];

    console.log('Comment saved:', newComment);
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error inserting comment:', error);
    res.status(500).json({ error: 'Error saving comment' });
  }
});

app.get('/api/questions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM questions');
    res.status(200).json(result.rows); 
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).send('Server error');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});