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
  const {id} = req.params;

    const updatepayload = req.body

    const parsepayload = updateTodo.safeParse(updatepayload);
    if(!parsepayload.success){
        res.status(411).json({msg:"wrong inputs"})
        return;
    }
    try{
      const updateTodo = await todo.findByIdAndUpdate(id,{completed:true}, {new:true});
       if(!updateTodo){
        res.status(404).json({msg:"todo not found"});
        return;
       }
       res.json({
        msg:"Todo marked as completed",
        todo:updateTodo
       })

    }
    catch(error){
      console.log("Error marking as complete:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
})


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


