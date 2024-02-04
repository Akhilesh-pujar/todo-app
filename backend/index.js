const express = require("express");
const { createTodo, updateTodo } = require("./type");
const { todo } = require("./db");
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: "*",
  };
  
  app.use(cors(corsOptions));
app.use(express.json());

app.post("/createtodo" , async function (req,res){
    const userbody = req.body
    const parsepayload = createTodo.safeParse(userbody)
    if(!parsepayload.success){
        res.status(411).json({msg:"you have sent wrong inputs"})
    }
    await todo.create({
    title:userbody.title,
    description:userbody.description,
    completed:false
    })
    res.json({msg:"Todo Created"})
})
app.get("/todos", async function(req,res){
   const todos = await todo.find({})
   res.json({
    todos
   })
 
})
app.put("/completed/:id", async function(req,res){
    const updatepayload = req.body
    const parsepayload = updateTodo.safeParse(updatepayload);
    if(!parsepayload.success){
        res.status(411).json({msg:"wrong inputs"})
        return;
    }

   await todo.update({
    _id:req.body,

   },{
    completed:true
   })
   res.json({
    msg:"Todo marked as completed"
   })
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


