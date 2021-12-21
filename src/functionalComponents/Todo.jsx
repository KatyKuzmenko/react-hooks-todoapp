import React, { useState } from 'react'

export const Todo = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  
  return (
    <li className={todo.iscompleted ? 'todo-list__item completed' : 'todo-list__item'}>
      {!isEditing && (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.iscompleted}
            // onChange={toggleTodo}
          />

          <label className='todo-title' onDoubleClick={setIsEditing}>
            {todo.title}
          </label>

          <button className='destroy' onClick={() => this.openModalWindow(todo.id)}></button>
        </div>
      )}
      {isEditing && (
        <input
          className='edit-field'
          type='text'
          defaultValue={todo.title}
          onKeyDown={this.setTitleOnEnter}
          onBlur={this.setTitleOnBlur}
          autoFocus
        />
      )}
    </li>
  )
}
