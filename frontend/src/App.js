import logo from './logo.svg';
import './App.css';
import TodoInput from './components/TodoInput';
import Todo from './components/Todo';
import { useEffect, useState } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateItemId, setUpdateItemId] = useState(null);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post("http://localhost:5000/create-todo", { text });
      console.log(res);
      if (res.data.success) {
        toast(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          success: true,
          theme: "dark",
        });
        getTodo();
        setIsUpdating(false);
        setText("");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const getTodo = async () => {
    let res = await axios.get("http://localhost:5000/get-todo");
    console.log(res.data.todo);
    setTodo(res.data.todo);
  }

  useEffect(() => {
    getTodo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete("http://localhost:5000/delete-todo", {
        data: { id }
      });
      if (res.data.success) {
        toast(res.data.message);
      } else {
        toast(res.data.err);
      }
      getTodo();
    } catch (err) {
      console.log(err);
    }
  };

  const updateMode = (id, text) => {
    console.log("Update mode activated for ID:", id);
    setIsUpdating(true);
    setUpdateItemId(id);
    setText(text);
    console.log(text)
  }

  const handleUpdate = async () => {
    try {
      const res = await axios.put("http://localhost:5000/update-todo", {
        id: updateItemId,
        text,
      });
      if (res.data.success) {
        toast(res.data.message);
        getTodo();
        setIsUpdating(false);
        setText("");
      } else {
        toast(res.data.err);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <div className="todo-container">
          <h1>TODO</h1>
          <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Add Todos..." />
          <button onClick={isUpdating ? handleUpdate : createTodo} className="add-btn">
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>
        {
          todo.map((item) =>
            <Todo
              text={item.text}
              handleUpdate={() => updateMode(item._id, item.text)}
              handleDelete={() => handleDelete(item._id)}
            />
          )
        }
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
