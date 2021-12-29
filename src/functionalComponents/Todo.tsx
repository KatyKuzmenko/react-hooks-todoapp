import React, { useCallback, useState } from 'react'
import { connect } from 'react-redux'
import { TodosActionsTypes } from '../types/actionTypes'
import { State } from '../types/StatesTypes'
import { Todo } from '../types/todosTypes'


type Props = {
  todo: Todo
  onModalOpen: () => void
  setIdToRemove: (id: number | null) => void
  toggleTask: (todo: Todo) => void
  changeTitle: (todo: Todo) => void
}

const TodoItem = ({
  todo,
  onModalOpen,
  setIdToRemove,
  toggleTask,
  changeTitle,
}: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const toggleTodo = useCallback(() => {
    toggleTask({ ...todo, iscompleted: !todo.iscompleted })
  }, [todo])

  const setNewTitle = useCallback(
    (title) => {
      changeTitle({ ...todo, title })
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
    onModalOpen()
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

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = (dispatch: (action: {type: string; options: Todo}) => void) => {
  return {
    toggleTask: (todo: Todo) => {
      dispatch({ type: TodosActionsTypes.TODO_TOGGLE_REQUEST, options: todo })
    },
    changeTitle: (todo: Todo) => {
      dispatch({ type: TodosActionsTypes.TODO_EDIT_TITLE_REQUEST, options: todo })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem)
