import React from 'react'

const TodoFilter = () => {
  return (
    <select>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="not_completed">Not Completed</option>
      
    </select>
  )
}

export default TodoFilter
