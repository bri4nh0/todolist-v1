# Todo List with Neon PostgreSQL

A React todo list application with a Node.js backend using Neon PostgreSQL database.

## Setup Instructions

### 1. Database Setup (Neon PostgreSQL)

1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new project
3. Copy the connection string from your dashboard
4. It should look like: `postgresql://username:password@host.neon.tech/database?sslmode=require`

### 2. Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory:
   ```
   DATABASE_URL=your_neon_postgresql_connection_string_here
   PORT=3001
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

   The server will run on http://localhost:3001

### 3. Frontend Setup

1. Navigate back to the root directory:
   ```bash
   cd ..
   ```

2. Install any missing dependencies if needed:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:5173

## Features

- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Filter todos by status (All, Open, Completed)
- Persistent storage with PostgreSQL database

## API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Add a new todo
- `PATCH /api/todos/:id` - Update todo completion status
- `DELETE /api/todos/:id` - Delete a todo
- `GET /api/health` - Health check

## Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  input TEXT NOT NULL,
  complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```