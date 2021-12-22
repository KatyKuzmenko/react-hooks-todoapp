import React from 'react'
import { connect } from 'react-redux'
import { createTodo } from '../api/api'
import { TODO_ADD } from '../store/actionTypes'

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    add: (todo) => {
      dispatch({ type: TODO_ADD, options: todo })
    },
  }
}

const NewTodoInput = (props) => {
  const addTodo = (event) => {
    if (event.key !== 'Enter' || !event.target.value) {
      return
    }

    createTodo(event.target.value)
      .then((todo) => {
        props.add(todo)
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

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoInput)
