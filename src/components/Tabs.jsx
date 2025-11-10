export function Tabs () {
    // Define buttons to be displayed in an array
    const tabs = ['All', 'Open','Completed']
    // Return an array of buttons using a map and unique key identifier
    return (
        <nav className="tab-container">
            {tabs.map((tab, tabIndex) => {
                return (
                    <button key={tabIndex} className="tab-button">
                        <h4>{tab} <span>(0)</span></h4>
                    </button>
                )
            })}
        </nav>
    )
}