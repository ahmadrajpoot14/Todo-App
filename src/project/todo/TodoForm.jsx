import { useState } from "react";
export const TodoForm = ({onAddtodo}) => {
    const [inputValue, setinputValue] = useState({});

     const handleInputChange = (value) => {
        setinputValue({id: value, content: value, checked: false});
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        onAddtodo(inputValue)
        setinputValue({id: "", content: "", checked: false})

    }
    return (
        <section className="form-content">
            <form onSubmit={handleFormSubmit}>
                <div>
                    <input type="text" className="todo-input" autoComplete="off" value={inputValue.content}
                        onChange={(event) => handleInputChange(event.target.value)} />
                </div>
                <div>
                    <button type="submit" className="todo-btn">
                        Add Task
                    </button>
                </div>
            </form>
        </section>
    )
}