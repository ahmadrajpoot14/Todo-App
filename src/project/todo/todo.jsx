import { useEffect, useState } from "react";
import "./todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";
import { TodoModal } from "./TodoModal";  // Import the new component

export const Todo = () => {
    const [task, setTask] = useState(() => getLocalStorageTodoData());
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    const handleFormSubmit = (inputValue) => {
        const { id, content, checked } = inputValue;

        if (!content.trim()) {
            setError("Task cannot be empty!");
            return;
        }

        setError("");
        const ifTodoContentMatched = task.find((curTask) => curTask.content === content);
        if (ifTodoContentMatched) return;

        setTask((prev) => [...prev, { id, content, checked }]);
    };

    const handleDeletetodo = (value) => {
        const updateTask = task.filter((curTask) => curTask.content !== value);
        setTask(updateTask);
    };

    const handleCleaartodobutton = () => {
        setTask([]);
        setShowModal(false);
    };

    const handleChecktodo = (content) => {
        const updatedTask = task.map((curTask) =>
            curTask.content === content ? { ...curTask, checked: !curTask.checked } : curTask
        );
        setTask(updatedTask);
    };

    useEffect(() => {
        setLocalStorageTodoData(task);
    }, [task]);

    return (
        <>
            <section className="todo-container">
                <header>
                    <h1>Todo List</h1>
                    <TodoDate />
                </header>

                <TodoForm onAddtodo={handleFormSubmit} />
                {error && <p className="error-message">{error}</p>}

                <section className="myUnOrdList">
                    <ul>
                        {task.slice(0, 3).map((curTask) => (
                            <TodoList
                                key={curTask.id}
                                data={curTask.content}
                                checked={curTask.checked}
                                onHandleDeleteTodo={handleDeletetodo}
                                onHandleCheckTodo={handleChecktodo}
                            />
                        ))}
                    </ul>

                    {task.length > 3 && (
                        <button className="see-more-btn" onClick={() => setShowModal(true)}>
                            See More
                        </button>
                    )}
                </section>

                <section>
                    <button className="clear-btn" onClick={handleCleaartodobutton}>
                        Clear All
                    </button>
                </section>
            </section>

            {showModal && (
                <TodoModal
                    tasks={task.slice(3)}
                    onClose={() => setShowModal(false)}
                    onDelete={handleDeletetodo}
                    onCheck={handleChecktodo}
                />
            )}
        </>
    );
};
