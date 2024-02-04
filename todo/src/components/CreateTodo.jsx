import { useState } from "react";
import axios from "axios";

export function CreateTodo(){

    const [title,settitle] =useState("");
    const [description,setdescription] =useState("");
    const [complete,setcomplete] =useState(false);
    const handlesubmit = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/createtodo", {
            title: title,
            description: description,
            complete: complete
        })
        .then(function (res) {
            alert("Todo added");
            console.log(res.data);
        })
        .catch(function (error) {
            console.error("Error adding todo:", error);
        });

        console.log(complete, title, description);
    
    }
    return(
        <div className="flex  justify-center items-center ">
            <div className="container ">
                <div className="  bg-white rounded-lg p-8
                 flex flex-col md:ml-auto mt-10 shadow-md">

                <input id="title" onChange={(e)=>settitle(e.target.value)}
             className=" mb-3 w-full bg-white rounded border border-gray-300
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
              text-base outline-none
              text-gray-700 py-1 px-3 leading-8 transition-colors 
              duration-200 ease-in-out"

            type="text" placeholder="Todo"/>


          <textarea id="description" onChange={(e)=>setdescription(e.target.value)}
            className=" mb-3 w-full bg-white rounded border border-gray-300
             focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
             h-32 text-base outline-none text-gray-700 
            py-1 px-3 resize-none leading-6 transition-colors duration-200
             ease-in-out"
            type="text" placeholder="description"/>



              <select 
                  className=" mb-3 w-full bg-white rounded border border-gray-300
                  focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 
                  h-10 text-base outline-none text-gray-700 
                 py-1 px-1 resize-none leading-8 transition-colors duration-200
                  ease-in-out"
            onChange={(e)=>setcomplete(e.target.value)}>
                <option value={true}>completed</option>
                <option value={false}>not completed</option>
            </select>
            
            <button onClick={handlesubmit} className="text-white
             bg-indigo-500
             border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 
             rounded text-lg">Add Todo</button>

                </div>

            

    
            </div>
           
        </div>
    )
}