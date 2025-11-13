import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv with the correct path
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    process.env.FRONTEND_URL
  ].filter(Boolean)
}));
app.use(express.json());

// Test database connection
pool.connect()
  .then(() => {
    console.log('✅ Connected to Neon PostgreSQL successfully');
    // Create todos table if it doesn't exist
    return pool.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        input TEXT NOT NULL,
        complete BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  })
  .then(() => console.log('✅ Todos table ready'))
  .catch(err => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });

// Routes

// GET all todos
app.get('/api/todos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos ORDER BY created_at DESC'
    );
    console.log(`📋 Fetched ${result.rows.length} todos`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { input } = req.body;
    
    if (!input || input.trim() === '') {
      return res.status(400).json({ error: 'Todo input is required' });
    }

    const result = await pool.query(
      'INSERT INTO todos (input) VALUES ($1) RETURNING *',
      [input.trim()]
    );
    
    console.log(`➕ Created new todo: "${input.trim()}"`);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { complete, input } = req.body;

    // Build dynamic query based on what's being updated
    let query = 'UPDATE todos SET updated_at = CURRENT_TIMESTAMP';
    let values = [];
    let valueIndex = 1;

    if (complete !== undefined) {
      query += `, complete = $${valueIndex}`;
      values.push(complete);
      valueIndex++;
    }

    if (input !== undefined) {
      query += `, input = $${valueIndex}`;
      values.push(input.trim());
      valueIndex++;
    }

    query += ` WHERE id = $${valueIndex} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(`✏️ Updated todo ${id}: ${JSON.stringify(req.body)}`);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(`🗑️ Deleted todo ${id}: "${result.rows[0].input}"`);
    res.json({ message: 'Todo deleted successfully', deletedTodo: result.rows[0] });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    database: 'connected' 
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('🔄 Shutting down gracefully...');
  pool.end(() => {
    console.log('✅ Database connections closed');
    process.exit(0);
  });
});
