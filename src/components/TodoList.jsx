import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const TodoList = ({ todos, deletetodo, completetodo }) => {
  return (
    <>
      <div className="todo-list">
        {todos?.map((todo) => (
          <div className="todo-list-item" key={todo.id}>
            <div className="input-check">
              <input
                type="checkbox"
                onChange={(e) => {
                  completetodo(e, todo.id);
                }}
              />
              <div className="todo-desc">
                <p id="t-task" className={todo.completed ? "strike" : ""}>
                  {todo.title}
                </p>
                <p className="descp">{todo.description}</p>
              </div>
            </div>

            <div className="btn-container">
              <div className="del">
                <MdDelete size={25} onClick={() => deletetodo(todo.id)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TodoList;
