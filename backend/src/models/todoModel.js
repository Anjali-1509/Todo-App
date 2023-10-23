const express = require("express")
const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    text:{
        type: String,
        require: true
    }
},{timestamps:true})

module.exports= mongoose.model("TODO", todoSchema)