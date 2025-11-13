import { useState } from "react"

export function TodoInput (props) {
    const { handleAddTodo, disabled = false } = props
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = async () => {
        if (!inputValue.trim() || disabled) { 
            return;
        }
        
        try {
            await handleAddTodo(inputValue.trim());
            setInputValue(''); // Clear input only after successful submission
        } catch (error) {
            console.error('Failed to add todo:', error);
            // Keep the input value so user doesn't lose their text
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="input-container">
            <input 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={disabled ? "Loading..." : "Add task"}
                disabled={disabled}
            />
            <button 
                onClick={handleSubmit}
                disabled={disabled || !inputValue.trim()}
                style={{
                    opacity: (disabled || !inputValue.trim()) ? 0.5 : 1,
                    cursor: (disabled || !inputValue.trim()) ? 'not-allowed' : 'pointer'
                }}
            >
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}