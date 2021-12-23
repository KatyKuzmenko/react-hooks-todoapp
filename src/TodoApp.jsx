import React from 'react'
import NewTodoInput from './functionalComponents/NewTodoInput'
import TodoList from './functionalComponents/TodoList'
import './styles/style.css'

export const TodoApp = () => {
  return (
    <section className='todoapp'>
      <NewTodoInput />
      <TodoList />
    </section>
  )
}
