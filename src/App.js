import { useEffect, useState } from "react";
import "./App.css";
import { MdDelete } from "react-icons/md";

function App() {
  let [todos, setTodos] = useState([]);

  const fetchtodo = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos/")
      .then((response) => response.json())
      .then((json) => {
        const data = json.splice(0, 5);
        const data2 = data.map((item)=>{
          return {...item,description:"fetched from API"}
        })
        setTodos(data2);
      });
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
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
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: true } : t)));
    } else {
      setTodos(todos.map((t) => (t.id === id ? { ...t, completed: false } : t)));
    }
  };

  const [newtodo, setNewTodo] = useState("");
  const [desc, setdesc] = useState("");

  const handleChange = (e) => {
    setNewTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newtodo) {
      addTodo(newtodo, desc);
    }
    setNewTodo("");
    setdesc("");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = todo.title.toLowerCase().includes(query);
    const descriptionMatch = todo.description.toLowerCase().includes(query);
    const isCompleted = todo.completed;

    if (filter === 'all') {
      return titleMatch || descriptionMatch;
    } else if (filter === 'completed') {
      return (titleMatch || descriptionMatch) && isCompleted;
    } else if (filter === 'not_completed') {
      return (titleMatch || descriptionMatch) && !isCompleted;
    }
    return "";
  });
  useEffect(() => {
    fetchtodo();
  }, []);
  return (
    <div>
      <h1>TODO LIST</h1>
      <div className="App">
        <div className="todo-search">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Todo..."
              value={newtodo}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Description..."
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
            <button>Add</button>
          </form>
        </div>
        <div className="add-features">
          <div className="search-form">
            <input
              type="text"
              placeholder="Search todos"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="filter-form">
            <select value={filter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not_completed">Not Completed</option>
            </select>
          </div>
        </div>
        <div className="todo-list">
          {filteredTodos?.map((todo) => (
            <div className="todo-list-item" key={todo.id}>
              <div className="input-check">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    completeTodo(e, todo.id);
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
                  <MdDelete size={25} onClick={() => deleteTodo(todo.id)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default App;
