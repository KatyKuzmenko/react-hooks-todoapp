import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'

import Loader from './Loader'
import Modal from './Modal'
import TodoItem from './Todo'
import TodoListFooter from './TodoFooter'
import { FETCH_TODOS_REQUEST, TOGGLE_ALL_TODOS_REQUEST } from '../store/actionTypes'
import { CurrentTodos, State, Todo, ToggleAllPayload } from '../types/types'
import { filterOption } from '../utils/constants'

type Props = {
  initTodosFromServer: () => void
  toggleAll: (iscompleted: boolean) => void
  todos: Todo[]
  loading: boolean
}

const TodoList = ({ initTodosFromServer, toggleAll, todos, loading }: Props) => {
  const [filterType, setFilterType] = useState<string>(filterOption.ALL)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [idToRemove, setIdToRemove] = useState<number | null>(null)

  useEffect(() => {
    initTodosFromServer()
  }, [])

  const toggleAllTasks = useCallback(
    (event) => {
      toggleAll(event.target.checked)
    },
    [todos]
  )

  const handleModalClose = useCallback(() => {
    setIsModalOpened(false)
  }, [])

  const handleModalOpen = useCallback(() => {
    setIsModalOpened(true)
  }, [])

  const activeTodos: Todo[] = useMemo(() => {
    return todos.filter((todo) => !todo.iscompleted)
  }, [todos])

  const completedTodos: Todo[] = useMemo(() => {
    return todos.filter((todo) => todo.iscompleted)
  }, [todos])
  
  const currentTodos: CurrentTodos = useMemo(() => {
    return {
      [filterOption.ALL]: todos,
      [filterOption.ACTIVE]: activeTodos,
      [filterOption.COMPLETED]: completedTodos,
    }
  }, [todos])

  const visibleTodos: Todo[] = useMemo(() => {
    return currentTodos[filterType]
  }, [filterType, todos])

  return (
    <>
      <section className={todos.length > 0 ? 'main' : 'main invisible'}>
        <span className='toggle-all-container'>
          <input
            id='toggle-all'
            className='toggle-all'
            type='checkbox'
            checked={activeTodos.length === 0}
            onChange={toggleAllTasks}
          />
          <label htmlFor='toggle-all'></label>
          <ul className='todo-list'>
            {visibleTodos.map((todo) => (
              <TodoItem
                todo={todo}
                key={todo.id}
                onModalOpen={handleModalOpen}
                setIdToRemove={setIdToRemove}
              />
            ))}
          </ul>
        </span>
      </section>
      {<TodoListFooter filterType={filterType} setFilterType={setFilterType} />}
      {loading && <Loader />}
      {<Modal isModalOpened={isModalOpened} onModalClose={handleModalClose} idToRemove={idToRemove} />}
    </>
  )
}

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = (dispatch: (action: {type: string; payload?: ToggleAllPayload}) => void) => {
  return {
    toggleAll: (iscompleted: boolean) => {
      dispatch({ type: TOGGLE_ALL_TODOS_REQUEST, payload: { iscompleted } })
    },
    initTodosFromServer: () => {
      dispatch({ type: FETCH_TODOS_REQUEST })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
