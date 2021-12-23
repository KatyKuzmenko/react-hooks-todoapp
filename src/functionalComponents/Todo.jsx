import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { updateTodo } from '../api/api'
import { TODO_EDIT } from '../store/actionTypes'

const Todo = ({ todo, setIsLoading, setIsModalOpened, setIdToRemove, toggleTask, changeTitle }) => {
  const [isEditing, setIsEditing] = useState(false)

  const toggleTodo = useCallback(() => {
    setIsLoading(true)
    updateTodo({ ...todo, iscompleted: !todo.iscompleted })
      .then((task) => {
        toggleTask(task)
        setIsLoading(false)
      })
      .catch((err) => console.warn(err))
  }, [todo])

  const setNewTitle = useCallback(
    (title) => {
      setIsLoading(true)
      updateTodo({ ...todo, title }).then((todo) => {
        changeTitle(todo)
        setIsLoading(false)
      })
      setIsEditing(false)
    },
    [todo]
  )

  const editTitle = useCallback(() => {
    setIsEditing(true)
  }, [isEditing])

  const setTitleOnBlur = useCallback(
    (event) => {
      if (!event.target.value.trim()) {
        return
      }

      setNewTitle(event.target.value.trim())
    },
    [todo]
  )

  const setTitleOnEnter = useCallback(
    (event) => {
      if (!event.target.value.trim() || event.key !== 'Enter') {
        return
      }

      setNewTitle(event.target.value.trim())
    },
    [todo]
  )

  const openModalWindow = useCallback(() => {
    setIdToRemove(todo.id)
    setIsModalOpened(true)
  }, [todo])

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

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleTask: (todo) => {
      dispatch({ type: TODO_EDIT, options: todo })
    },
    changeTitle: (todo) => {
      dispatch({ type: TODO_EDIT, options: todo })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo)
