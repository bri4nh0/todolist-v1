import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

// App component that displays all components
function App() {
  const todos = [
    {input: 'Learn React', complete: false},
    {input: 'Build a ToDo App', complete: true},
    {input: 'Profit', complete: false},
    {input: 'Celebrate', complete: true}
  ]
  return (
    <>
      <Header todos={todos} />
      <Tabs todos={todos} />
      <TodoList todos={todos} />
      <TodoInput />
    </>
  )
}

export default App
