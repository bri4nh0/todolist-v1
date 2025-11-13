import { TodoCard } from "./TodoCard";

export function TodoList (props) {
    const { todos, selectedTab } = props
   
    const filterTodosList = selectedTab === 'All' ?
    todos : 
    selectedTab === 'Completed' ?
        todos.filter(val => val.complete) :
        todos.filter(val => !val.complete)
        
    return (
        <>
            {filterTodosList.length === 0 ? (
                <div className="empty-state" style={{
                    textAlign: 'center',
                    padding: '2rem',
                    opacity: '0.6',
                    fontStyle: 'italic'
                }}>
                    {selectedTab === 'All' && '📝 No todos yet. Add one above!'}
                    {selectedTab === 'Open' && '🎉 No open todos! You\'re all caught up!'}
                    {selectedTab === 'Completed' && '📋 No completed todos yet.'}
                </div>
            ) : (
                filterTodosList.map((todo, todoIndex) => {
                    return (
                        <TodoCard 
                            key={todo.id || todoIndex} 
                            todoIndex={todoIndex}
                            {...props}
                            todo={todo} 
                        />
                    )
                })
            )}
        </>
    )
}