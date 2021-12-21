import React from 'react'
import { createTodo } from '../api/api'

export const NewTodoInput = () => {
  const addTodo = (event) => {
    if (event.key !== 'Enter' || !event.target.value) {
      return
    }

    createTodo(event.target.value)
      .then((todo) => {
        this.props.onAdding(todo)
        event.target.value = ''
      })
      .catch((err) => console.warn(err))
  }
  return (
    <header className='header'>
      <h1>todos</h1>
      <input className='new-todo' placeholder='What needs to be done?' onKeyDown={addTodo} />
    </header>
  )
}
