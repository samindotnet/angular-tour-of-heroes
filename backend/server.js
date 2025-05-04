const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'heroes_db',
  password: 'S0@p7398',
  port: 5432
});

app.use(cors());
app.use(bodyParser.json());

// GET all heroes
app.get('/api/heroes', async (req, res) => {
  const result = await pool.query('SELECT * FROM heroes ORDER BY id');
  res.json(result.rows);
});

// GET hero by ID
app.get('/api/heroes/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM heroes WHERE id = $1', [id]);
  res.json(result.rows[0]);
});

// POST new hero
app.post('/api/heroes', async (req, res) => {
  const { name } = req.body;
  const result = await pool.query('INSERT INTO heroes (name) VALUES ($1) RETURNING *', [name]);
  res.json(result.rows[0]);
});

// PUT update hero
app.put('/api/heroes/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  await pool.query('UPDATE heroes SET name = $1 WHERE id = $2', [name, id]);
  res.sendStatus(204);
});

// DELETE hero
app.delete('/api/heroes/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM heroes WHERE id = $1', [id]);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
