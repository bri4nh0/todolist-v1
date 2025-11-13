import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { todoAPI } from "./services/todoAPI"

import { useState, useEffect } from 'react'

// App component that displays all components
function App() {
    
  const date = new Date();
  const showTime = date.getHours() 
  + ':' + date.getMinutes();
  

  const [todos, setTodos] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoAPI.fetchTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      setError('Failed to load todos. Please check your connection.');
      console.error('Load todos error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (newTodo) => {
    if (!newTodo || newTodo.trim() === '') return;
    
    try {
      setLoading(true);
      setError(null);
      await todoAPI.createTodo(newTodo);
      await loadTodos(); // Refresh the list
    } catch (error) {
      setError('Failed to add todo. Please try again.');
      console.error('Add todo error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTodo = async (index) => {
    try {
      setLoading(true);
      setError(null);
      const todo = todos[index];
      await todoAPI.updateTodo(todo.id, { complete: !todo.complete });
      await loadTodos(); // Refresh the list
    } catch (error) {
      setError('Failed to update todo. Please try again.');
      console.error('Update todo error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (index) => {
    try {
      setLoading(true);
      setError(null);
      const todo = todos[index];
      await todoAPI.deleteTodo(todo.id);
      await loadTodos(); // Refresh the list
    } catch (error) {
      setError('Failed to delete todo. Please try again.');
      console.error('Delete todo error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="time-container">
        <h1>Current Time</h1>
        <h2> {showTime} </h2>
      </div>
      
      {error && (
        <div className="error-message" style={{
          color: 'red', 
          textAlign: 'center', 
          margin: '1rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(255, 0, 0, 0.1)',
          borderRadius: '0.5rem',
          border: '1px solid rgba(255, 0, 0, 0.3)'
        }}>
          ⚠️ {error}
        </div>
      )}
      
      {loading && (
        <div className="loading-message" style={{
          textAlign: 'center', 
          margin: '1rem',
          padding: '0.5rem',
          backgroundColor: 'rgba(0, 100, 255, 0.1)',
          borderRadius: '0.5rem',
          color: 'var(--color-link)'
        }}>
          🔄 Loading...
        </div>
      )}
      
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo}
                handleDeleteTodo={handleDeleteTodo} 
                selectedTab={selectedTab} 
                todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo} disabled={loading} />
    </>
  )
}

export default App
