import React, { useCallback } from 'react'
import { connect } from 'react-redux'
import { TodosActionsTypes } from '../types/actionTypes'
import { State } from '../types/StatesTypes'


type Props = {
  addTask: (title: string) => void
}

const NewTodoInput = ({ addTask }: Props) => {
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

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = (dispatch: (action: {type: string; options: {title:string}}) => void) => {
  return {
    addTask: (title: string) => {
      dispatch({ type: TodosActionsTypes.TODO_ADD_REQUEST, options: { title } })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoInput)
