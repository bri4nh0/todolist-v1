export function Tabs (props) {
    const { todos } = props
    // Define buttons to be displayed in an array
    const tabs = ['All', 'Open','Completed']
    // Return an array of buttons using a map and unique key identifier
    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {
                const numOfTasks = tab === 'All' ? 
                    todos.length :
                    tab === 'Open' ? 
                        todos.filter(val => !val.complete).
                        length :
                        todos.filter(val => val.complete).length
                return (
                    <button key={tabIndex} className="tab-button">
                        <h4>{tab} <span>({numOfTasks})</span></h4>
                    </button>
                )
            })}
        </nav>
    )
}