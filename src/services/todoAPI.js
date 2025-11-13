/**
 * TodoAPI - Frontend service for communicating with the backend API
 * Handles all HTTP requests to the Express server
 */

const API_BASE_URL = 'http://localhost:3001/api';

class TodoAPI {
  /**
   * Fetch all todos from the server
   * @returns {Promise<Array>} Array of todo objects
   */
  async fetchTodos() {
    try {
      console.log('🔍 Fetching todos from API...');
      const response = await fetch(`${API_BASE_URL}/todos`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const todos = await response.json();
      console.log(`✅ Fetched ${todos.length} todos from API`);
      return todos;
    } catch (error) {
      console.error('❌ Error fetching todos:', error);
      throw new Error('Failed to fetch todos. Please check your internet connection and try again.');
    }
  }

  /**
   * Create a new todo
   * @param {string} input - The todo text
   * @returns {Promise<Object>} The created todo object
   */
  async createTodo(input) {
    try {
      console.log(`➕ Creating new todo: "${input}"`);
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const newTodo = await response.json();
      console.log(`✅ Created todo with ID: ${newTodo.id}`);
      return newTodo;
    } catch (error) {
      console.error('❌ Error creating todo:', error);
      throw new Error('Failed to create todo. Please try again.');
    }
  }

  /**
   * Update an existing todo
   * @param {number} id - The todo ID
   * @param {Object} updates - Object containing fields to update
   * @returns {Promise<Object>} The updated todo object
   */
  async updateTodo(id, updates) {
    try {
      console.log(`✏️ Updating todo ${id}:`, updates);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const updatedTodo = await response.json();
      console.log(`✅ Updated todo ${id} successfully`);
      return updatedTodo;
    } catch (error) {
      console.error('❌ Error updating todo:', error);
      throw new Error('Failed to update todo. Please try again.');
    }
  }

  /**
   * Delete a todo
   * @param {number} id - The todo ID to delete
   * @returns {Promise<Object>} Success message
   */
  async deleteTodo(id) {
    try {
      console.log(`🗑️ Deleting todo ${id}`);
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log(`✅ Deleted todo ${id} successfully`);
      return result;
    } catch (error) {
      console.error('❌ Error deleting todo:', error);
      throw new Error('Failed to delete todo. Please try again.');
    }
  }

  /**
   * Check server health
   * @returns {Promise<Object>} Server status
   */
  async checkHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('❌ Server health check failed:', error);
      throw new Error('Server is not responding');
    }
  }
}

// Create and export a singleton instance
export const todoAPI = new TodoAPI();

// Export the class as well for testing purposes
export { TodoAPI };
