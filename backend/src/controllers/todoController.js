const mongoose = require("mongoose")
const TodoModel = require("../models/todoModel")



exports.createTodo = async (req, res) => {
    try {
        const data = req.body
        console.log(data)
        const todo = await TodoModel.create(data)
        return res.status(201).send({ success: true,message:"Todo Created Successfully", todo: todo })
    }
    catch (err) {
        res.status(500).send({ success: false, err: err })
    }
}

exports.getTodo = async (req, res) => {
    try {
        let todos = await TodoModel.find()
        return res.status(200).send({ success: true, todo: todos })
    }
    catch (err) {
        res.status(500).send({ success: false, err: err })
    }
}


exports.updateTodo = async(req,res)=>{
    try{
       const {text, id} = req.body
       let updatedTodo = await TodoModel.findByIdAndUpdate(id, {text}, {new:true})
       return res.status(200).send({success:true, message:"Todo Updated Successfully", todo:updatedTodo})
    }
    catch(err){
        res.status(500).send({success:false, errr:err})
    }
}

exports.deleteTodo = async (req, res) => {
    try {
      const { id } = req.body;
      const deletedTodo = await TodoModel.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        return res.status(404).json({ success: false, message: "Todo not found" });
      }
  
      return res.status(200).json({ success: true, message: "Todo Deleted Successfully" });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  }
  