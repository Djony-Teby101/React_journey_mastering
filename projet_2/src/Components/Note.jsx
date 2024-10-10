import React, { useState,useEffect } from 'react'


function Note() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [editingTask, setEditingTask] = useState(null);
    const [editText, setEditText] = useState('');
  
    // Charger les tâches depuis le LocalStorage au chargement de l'application
    useEffect(() => {
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (savedTasks) {
        setTasks(savedTasks);
      }
    }, []);
  
    // Sauvegarder les tâches dans le LocalStorage à chaque changement
    const saveToLocalStorage = (tasks) => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    };
  
    // Ajouter une nouvelle tâche
    const addTask = () => {
      if (newTask.trim()) {
        const newTasks = [...tasks, { id: Date.now(), text: newTask }];
        setTasks(newTasks);
        saveToLocalStorage(newTasks);
        setNewTask('');
      }
    };
  
    // Supprimer une tâche
    const deleteTask = (id) => {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
    };
  
    // Mettre à jour une tâche
    const updateTask = (id) => {
      const updatedTasks = tasks.map(task => (task.id === id ? { ...task, text: editText } : task));
      setTasks(updatedTasks);
      saveToLocalStorage(updatedTasks);
      setEditingTask(null);
      setEditText('');
    };
  
    return (
      <div className="App">
        <h1>CRUD Todo Liste basique</h1>
  
        {/* Ajouter une tâche */}

        
         <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button onClick={addTask}>Ajouter</button>
  
        {/* Liste des tâches */}
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {editingTask === task.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => updateTask(task.id)}>Mettre à jour</button>
                </>
              ) : (
                <>
                  {task.text}
                  <button onClick={() => {
                    setEditingTask(task.id);
                    setEditText(task.text);
                  }}>Modifier</button>
                  <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
   
};

export default Note