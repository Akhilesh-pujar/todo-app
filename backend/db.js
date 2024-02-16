const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URI = process.env.MONGODB_URL
mongoose.connect(URI)

const TodoSchema = mongoose.Schema({
    title :String,
    description : String,
    completed : Boolean,
})
const todo = mongoose.model("todos", TodoSchema)
module.exports={
    todo
}