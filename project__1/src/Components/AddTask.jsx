import React, { useEffect, useState } from 'react'

export const AddTask = ({onAddTask}) => {


  
  
  const [newtask, setNewTask]=useState('')

  
  const handleAddTask=(event)=>{
    event.preventDefault();
    onAddTask({text: newtask, completed:false});
    console.log(newtask)
    setNewTask('');


  }


  return (
    <form onSubmit={handleAddTask}>
      <input type="text"  value={newtask}
       onChange={(e)=>setNewTask(e.target.value)}
       placeholder='Add new task' />

       <button type='submit'>submit</button>
    </form>
  )
}
