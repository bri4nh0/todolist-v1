import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import { useState } from 'react'
// App component that displays all components
function App() {
    
  const date = new Date();
  const showTime = date.getHours() 
  + ':' + date.getMinutes();
  

  const [todos, setTodos] = useState([
    
  ])

  const [selectedTab, setSelectedTab] = useState('All')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete:
    false }]
    setTodos(newTodoList)
    }
  

  function handleCompleteTodo(index) {
    let newTodoList = [...todos]
    let completedTodo = todos[index]
    completedTodo['complete'] = true
    newTodoList[index] = completedTodo
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    let newTodoList = todos.filter ((val, valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList)
  }
  return (
    <>
      <div className="time-container">
        <h2>Current Time</h2>
        <h2> {showTime} </h2>
      </div>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} 
            setSelectedTab={setSelectedTab} 
            todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo}
                handleDeleteTodo={handleDeleteTodo} 
                selectedTab={selectedTab} 
                todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo}/>
    </>
  )
}

export default App
