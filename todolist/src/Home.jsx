import React, { useEffect, useState } from 'react'
import Create from './Create'
import axios from 'axios'
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegCircle } from "react-icons/fa6";
import { CiCircleCheck } from "react-icons/ci";

function Home() {
  const [todos, setTodos] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/get')
    .then(result => setTodos(result.data))
    .catch(err => console.log(err))
  }, [])

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/delete/'+id)
    .then(result => {
      location.reload()
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className='home'>
        <h2>TO-DO LIST</h2>
        <Create/>
        <br/>
        {
          todos.length === 0 
          ?
          <div><h2>No Record found</h2></div>
          :
          todos.map(todo => (
            <div className='task'> 
            <div className='checkbox'onClick={() => handleEdit(todo._id)}>
              {todo.done ? 
              <CiCircleCheck className='icon'></CiCircleCheck>
             : <FaRegCircle className='icon'/>
             }
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span><RiDeleteBin5Line className='icon' onClick={() => handleDelete(todo._id)}/></span>
            </div>
            </div>
          ) )
        }
    </div>
  )
}

export default Home