import { useEffect, useState } from "react";
import "./todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import { getLocalStorageTodoData, setLocalStorageTodoData } from "./TodoLocalStorage";

export const Todo = () => {
    
    

    const [task, setTask] = useState(() => getLocalStorageTodoData());




    const handleFormSubmit = (inputValue) => {
        const { id, content, checked } = inputValue;

        if (!content) return;
        const ifTodoContentMatched = task.find((curTask) => curTask.content === content);
        if (ifTodoContentMatched) return;
        setTask((prev) => [...prev, { id, content, checked }])

    }

    const handleDeletetodo = (value) => {
        const updateTask = task.filter((curTask) => curTask.content !== value)
        setTask(updateTask);

    }
    const handleCleaartodobutton = () => {
        setTask([]);
    }
    const handleChecktodo = (content) => {
        const updatedTask = task.map((curTask) => {
            if (curTask.content === content) {
                return { ...curTask, checked: !curTask.checked };
            } else {
                return curTask;
            }
        })
        setTask(updatedTask);

    }

    setLocalStorageTodoData(task);

    return (
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <TodoDate />
            </header>
            <TodoForm onAddtodo={handleFormSubmit} />
            <section className="myUnOrdList">
                <ul>
                    {task.map((curTask, index) => {
                        return (
                            <TodoList key={curTask.id} data={curTask.content}
                                checked={curTask.checked}
                                onHandleDeleteTodo={handleDeletetodo}
                                onHandleCheckTodo={handleChecktodo}
                            />
                        );
                    })}
                </ul>
            </section>
            <section>
                <button className="clear-btn" onClick={handleCleaartodobutton}>Clear All</button>
            </section>
        </section>

    );
};
