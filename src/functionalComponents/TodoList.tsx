import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { TodosActionsTypes } from '../types/actionTypes'
import { State } from '../types/StatesTypes'
import { CurrentTodos, FilterOptions, Todo } from '../types/todosTypes'

import Loader from './Loader'
import Modal from './Modal'
import TodoItem from './Todo'
import TodoListFooter from './TodoFooter'

type Props = {
  initTodosFromServer: () => void
  toggleAll: (iscompleted: boolean) => void
  receiveToken: (id: number) => any
  todos: Todo[]
  loading: boolean
}

const TodoList = ({ initTodosFromServer, toggleAll, receiveToken, todos, loading }: Props) => {
  const [filterType, setFilterType] = useState<string>(FilterOptions.ALL)
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)
  const [idToRemove, setIdToRemove] = useState<number | null>(null)

  useEffect(() => {
    receiveToken(1)
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
      [FilterOptions.ALL]: todos,
      [FilterOptions.ACTIVE]: activeTodos,
      [FilterOptions.COMPLETED]: completedTodos,
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
      {
        <Modal
          isModalOpened={isModalOpened}
          onModalClose={handleModalClose}
          idToRemove={idToRemove}
        />
      }
    </>
  )
}

const mapStateToProps = (state: State) => {
  return {
    todos: state.todos,
    loading: state.app.loading,
  }
}

const mapDispatchToProps = (
  dispatch: (action: { type: string; payload?: {iscompleted: boolean}; options?: {id: number}}) => void
) => {
  return {
    receiveToken: (id: number) => {
      dispatch({ type: TodosActionsTypes.GET_TOKEN_REQUEST, options: { id }})
    },
    toggleAll: (iscompleted: boolean) => {
      dispatch({ type: TodosActionsTypes.TOGGLE_ALL_TODOS_REQUEST, payload: { iscompleted } })
    },
    initTodosFromServer: () => {
      dispatch({ type: TodosActionsTypes.FETCH_TODOS_REQUEST })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
