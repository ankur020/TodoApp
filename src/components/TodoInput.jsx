import React, { useState } from "react";

const TodoInput = ({ addtodo }) => {
  const [newtodo, setNewTodo] = useState("");
  const [desc,setdesc] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newtodo) {
      addtodo(newtodo,desc);
    }
    setNewTodo("");
    setdesc("");
  };
  return (
    <div className="todo-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Todo..."
          value={newtodo}
          onChange={handleChange}
        />
        <input type="text" placeholder="Description..." value={desc} onChange = {e=> setdesc(e.target.value)}/>
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoInput;
