
import {  useState,useEffect} from 'react'
import axios from "axios"
function GetTodos() {
    const [todos, settodos] = useState([]);

    useEffect(()=>{
      axios.get("http://localhost:8000/todos")
    .then(response=>{
      settodos(response.data.todos);
    })
    .catch(error=>{
      console.log("error fetching todos:", error)
    })
    
      
    },[])

    const markasComplete = async(id)=>{
      try{
        const res = await axios.put(`http://localhost:8000/completed/${id}`,{
          completed:true
        });
        if(res.status === 200){
          const updateTodos = todos.map(todo=>{
            if(todo._id === id){
              return {...todo, completed:true};
            }
            return todo;
          })
          settodos(updateTodos)
        }
      }
      catch(err){
        console.log("error marking as complete:",err)
      }
    }
  return (
    <div className='flex justify-center items-center flex-col mx-auto '>
        <h2 className='mt-10 text-xl'>Todo list</h2>
        <ul className=' mt-6 flex flex-col gap-4  w-full max-w-lg shadow-md '>
             {todos.map(todo => (
                    <li key={todo._id} className='bg-white shadow-md rounded-md p-4'>
                        <h3 className='px-3 py-3 mb-2 text-lg font-semibold'><span className=' font-semibold '>Todo:</span>
                         {todo.title}</h3>
                        <p className='mb-2'>Description :{todo.description}</p>
                        <p className='text-grey-600'>Completed: {todo.completed ? 'Yes' : 'No'}</p>
                        {!todo.completed && (
                          <button
                          className='px-3 py-2 bg-green-500 text-white'
                          onClick={()=> markasComplete(todo._id) }
                          >Mark as Completed</button>
                        )}
                    </li>
                ))}
            </ul>
        
    </div>
  )
}

export default GetTodos