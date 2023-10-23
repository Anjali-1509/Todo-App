import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


export default function TodoInput() {
    const [text, setText] = useState("")

    const createTodo = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post("http://localhost:5000/create-todo", { text })
            console.log(res)
            if (res.data.success) {
                toast(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    success:true,
                    theme: "dark",
                })
            }
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        <div className="todo-container">
            <h1>TODO</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Add Todos..." />
            <button onClick={createTodo} className="add-btn">ADD</button>
        </div>
    )
}