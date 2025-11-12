const API_BASE_URL = 'http://localhost:3001/api';

export const todoAPI = {
  // Get all todos
  getTodos: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Add a new todo
  addTodo: async (input) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      if (!response.ok) {
        throw new Error('Failed to add todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  },

  // Update todo completion status
  updateTodo: async (id, complete) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete }),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  },

  // Delete a todo
  deleteTodo: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  },
};