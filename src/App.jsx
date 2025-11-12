import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"
import { todoAPI } from "./services/todoAPI"

import { useState, useEffect } from 'react'
// App component that displays all components
function App() {

  const [todos, setTodos] = useState([])
  const [selectedTab, setSelectedTab] = useState('All')
  const [loading, setLoading] = useState(true)

  // Load todos from database on component mount
  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    try {
      setLoading(true)
      const todosFromDB = await todoAPI.getTodos()
      setTodos(todosFromDB)
    } catch (error) {
      console.error('Error loading todos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTodo = async (newTodo) => {
    try {
      const addedTodo = await todoAPI.addTodo(newTodo)
      setTodos(prevTodos => [addedTodo, ...prevTodos])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  const handleCompleteTodo = async (todoId) => {
    try {
      const todo = todos.find(t => t.id === todoId)
      if (todo) {
        const updatedTodo = await todoAPI.updateTodo(todoId, !todo.complete)
        setTodos(prevTodos => 
          prevTodos.map(t => t.id === todoId ? updatedTodo : t)
        )
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  const handleDeleteTodo = async (todoId) => {
    try {
      await todoAPI.deleteTodo(todoId)
      setTodos(prevTodos => prevTodos.filter(t => t.id !== todoId))
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }
  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            todos={todos} />
      {loading ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Loading todos...
        </div>
      ) : (
        <TodoList handleCompleteTodo={handleCompleteTodo}
                  handleDeleteTodo={handleDeleteTodo} 
                  selectedTab={selectedTab} 
                  todos={todos} />
      )}
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
