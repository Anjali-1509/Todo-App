import logo from './logo.svg';
import './App.css';
import TodoInput from './components/TodoInput';
import Todo from './components/Todo';
import { useEffect, useState } from 'react';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [todo, setTodo] = useState([])

  const getTodo = async () => {
    let res = await axios("http://localhost:5000/get-todo")

    console.log(res.data.todo)
    setTodo(res.data.todo)
  }

  useEffect(() => {
    getTodo()
  }, [])

  const handleDelete = async (id) => {
    console.log(id);
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



  const handleUpdate = () => {

  }
  return (
    <div className="App">
      <div className='container'>
        <TodoInput />
        {
          todo.map((item) =>
            <Todo text={item.text} handleUpdate={handleUpdate} handleDelete={() => handleDelete(item._id)} />
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
