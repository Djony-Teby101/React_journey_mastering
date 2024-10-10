import React from 'react'

export const TodoItem = ({task, onDelete, onToggleCompleted}) => {
  return (
    <>
    <li>
      <input type="checkbox"
      checked={task.completed}
      onChange={onToggleCompleted} />

      <span style={{ textDecoration: task.completed ? 'line-through': 'none' }}>
        {task.text}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
    </>
  )
}
