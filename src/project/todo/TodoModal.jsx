import React from "react";
import { TodoList } from "./TodoList";
import "./todo.css";

export const TodoModal = ({ tasks, onClose, onDelete, onCheck }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="all-task">All Tasks</h2>
                <ul>
                    {tasks.map((task) => (
                        <TodoList
                            key={task.id}
                            data={task.content}
                            checked={task.checked}
                            onHandleDeleteTodo={onDelete}
                            onHandleCheckTodo={onCheck}
                        />
                    ))}
                </ul>
                <button className="close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};
