export function TodoCard (props) {
    const { todo, handleDeleteTodo, todoIndex, handleCompleteTodo } = props
    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={() => {
                    handleCompleteTodo(todoIndex)}}
                    disabled={todo.complete}>
                    <h6><i class="fa-solid fa-check"></i></h6>
                </button>
                <button onClick={() => {
                    handleDeleteTodo(todoIndex)
                }}>
                    <h6><i class="fa-solid fa-xmark"></i></h6>
                </button>
            </div>
        </div>
    )
}