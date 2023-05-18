import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import TodoFilter from "./components/TodoFilter";
import TodoSearch from "./components/TodoSearch";

function App() {
  let [todos, setTodos] = useState([]);

  const fetchtodo = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => {
        setTodos(json.splice(0, 5));
      });
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  const addTodo = (task, des) => {
    setTodos([
      ...todos,
      {
        userId: 1,
        id: parseInt(todos[todos.length - 1].id) + 1,
        title: task,
        description: des,
        completed: false,
      },
    ]);
  };

  let completeTodo = (e, id) => {
    if (e.target.checked) {
      setTodos(todos.map((t) => (t.id == id ? { ...t, completed: true } : t)));
    } else {
      setTodos(todos.map((t) => (t.id == id ? { ...t, completed: false } : t)));
    }
  };

  useEffect(() => {
    fetchtodo();
  }, []);
  return (
    <div>
      <h1>TODO LIST</h1>
    <div className="App">
    
      <TodoInput addtodo={addTodo} />
      <div className="add-features">
        <TodoSearch />
        <TodoFilter />
      </div>
      <TodoList
        todos={todos}
        deletetodo={deleteTodo}
        completetodo={completeTodo}
      />
    </div>
    </div>
  );
}
export default App;
