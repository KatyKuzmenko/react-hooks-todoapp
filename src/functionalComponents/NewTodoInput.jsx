import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { TODO_ADD_REQUEST } from '../store/actionTypes'

const NewTodoInput = ({ addTask }) => {
  const addTodo = useCallback((event) => {
    if (event.key !== 'Enter' || !event.target.value) {
      return
    }

    addTask(event.target.value)
    event.target.value = ''
  }, [])

  return (
    <header className='header'>
      <h1>todos</h1>
      <input
        className='new-todo'
        placeholder='What needs to be done?'
        defaultValue={''}
        onKeyDown={addTodo}
      />
    </header>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (title) => {
      dispatch({ type: TODO_ADD_REQUEST, options: { title } })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoInput)
