import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateTodo } from '../api/api'
import { TODO_EDIT } from '../store/actionTypes'

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTodoAction: (todo) => {
      dispatch({ type: TODO_EDIT, options: todo })
    },
    changeTitleAction: (todo) => {
      dispatch({ type: TODO_EDIT, options: todo })
    },
  }
}

const Todo = (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const { todo, setIsLoading, setIsModalOpened, setIdToRemove } = props

  const toggleTodo = () => {
    setIsLoading(true)
    updateTodo({ ...todo, iscompleted: !todo.iscompleted })
      .then((task) => {
        props.toggleTodoAction(task)
        setIsLoading(false)
      })
      .catch((err) => console.warn(err))
  }

  const setNewTitle = (title) => {
    setIsLoading(true)
    updateTodo({ ...todo, title }).then((todo) => {
      props.changeTitleAction(todo)
      setIsLoading(false)
    })
    setIsEditing(false)
  }

  const editTitle = () => {
    setIsEditing(true)
  }

  const setTitleOnBlur = (event) => {
    if (!event.target.value.trim()) {
      return
    }

    setNewTitle(event.target.value.trim())
  }

  const setTitleOnEnter = (event) => {
    if (!event.target.value.trim() || event.key !== 'Enter') {
      return
    }

    setNewTitle(event.target.value.trim())
  }

  const openModalWindow = () => {
    setIdToRemove(todo.id)
    setIsModalOpened(true)
  }

  return (
    <li className={todo.iscompleted ? 'todo-list__item completed' : 'todo-list__item'}>
      {!isEditing && (
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            checked={todo.iscompleted}
            onChange={toggleTodo}
          />

          <label className='todo-title' onDoubleClick={editTitle}>
            {todo.title}
          </label>

          <button className='destroy' onClick={openModalWindow}></button>
        </div>
      )}
      {isEditing && (
        <input
          className='edit-field'
          type='text'
          defaultValue={todo.title}
          onKeyDown={setTitleOnEnter}
          onBlur={setTitleOnBlur}
          autoFocus
        />
      )}
    </li>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
