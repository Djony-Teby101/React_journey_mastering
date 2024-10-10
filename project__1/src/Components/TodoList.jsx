import React, { useState , useEffect} from 'react'
import { TodoItem } from './TodoItem';
import { AddTask } from './AddTask';



export const TodoList = () => {
    const [tasks, setTasks]= useState([])
    const [newtask, setNewTask]= useState('');
    // console.log(newtask)

    // Stockage des données.
    useEffect(()=>{
        const storedTask=localStorage.getItem('Tasks');
        if(storedTask){
          setTasks(JSON.parse(storedTask))
        }
      },[])

    // Function ajout .
    const handleAddTask=(task)=>{
        setTasks([...tasks, task])

        localStorage.setItem('Tasks', JSON.stringify(task))
    }

    // Fonction de suppression
    const handleDeleteTask=(taskIndex)=>{
        setTasks(tasks.filter((task, index)=>{
            index !==taskIndex
        }))
    }

    // Fonction toggle button.
    const onToggleCompleted=(taskIndex)=>{
        setTasks(
            tasks.map((task, index)=>{
                if(index ===taskIndex){
                    return {...task, completed: !task.completed}
                }return task
            })
        );
       
    }


  return (
    <>
        <div className='container-todo-list'>
            <h1>Todo List</h1>
            <ul>
                {tasks.map((task, index)=>(
                    <TodoItem 
                        key={index}
                        task={task}
                        onDelete={()=>handleDeleteTask(index)}
                        onToggleCompleted={()=>onToggleCompleted(index)}
                    />
                ))} 
            </ul>
            <AddTask  onAddTask={handleAddTask}/>
        </div>
    </>
  )
}
