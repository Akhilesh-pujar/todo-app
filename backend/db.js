const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

mongoose.connect("mongodb+srv://todo-database:NQuFUHoSBiLOY48I@cluster0.xkcpzov.mongodb.net/?retryWrites=true&w=majority")

const TodoSchema = mongoose.Schema({
    title :String,
    description : String,
    completed : Boolean,
})
const todo = mongoose.model("todos", TodoSchema)
module.exports={
    todo
}