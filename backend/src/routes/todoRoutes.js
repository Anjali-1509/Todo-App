const express = require("express")
const { createTodo, getTodo, updateTodo, deleteTodo } = require("../controllers/todoController")
const router= express.Router()

router.get("/", (req,res)=>{
    res.send("hi i am api")
})

router.post("/create-todo", createTodo)
router.get("/get-todo", getTodo)
router.put("/update-todo", updateTodo)
router.delete("/delete-todo", deleteTodo )

module.exports= router