import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { FETCH_TODOS_REQUEST, TOGGLE_ALL_TODOS_REQUEST } from '../store/actionTypes'
import { Loader } from './Loader'
import Modal from './Modal'
import Todo from './Todo'
import TodoListFooter from './TodoFooter'

const TodoList = ({ initTodosFromServer, toggleAll, todos }) => {
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [idToRemove, setIdToRemove] = useState(null)

  useEffect(() => {
    initTodosFromServer()
  }, [])

  const toggleAllTasks = useCallback(
    (event) => {
      toggleAll(event.target.checked)
    },
    [todos]
  )

  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.iscompleted)
  }, [todos])
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.iscompleted)
  }, [todos])
  const currentTodos = useMemo(() => {
    return {
      all: todos,
      active: activeTodos,
      completed: completedTodos,
    }
  }, [todos])
  const visibleTodos = useMemo(() => {
    return currentTodos[filterType]
  }, [todos])

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
              <Todo
                todo={todo}
                key={todo.id}
                setIsLoading={setIsLoading}
                setIsModalOpened={setIsModalOpened}
                setIdToRemove={setIdToRemove}
              />
            ))}
          </ul>
        </span>
      </section>
      {
        <TodoListFooter
          filterType={filterType}
          setFilterType={setFilterType}
          setIsLoading={setIsLoading}
        />
      }
      {isLoading && <Loader />}
      {isModalOpened && (
        <Modal
          setIsLoading={setIsLoading}
          setIsModalOpened={setIsModalOpened}
          idToRemove={idToRemove}
        />
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAll: (iscompleted) => {
      dispatch({ type: TOGGLE_ALL_TODOS_REQUEST, payload: { iscompleted } })
    },
    initTodosFromServer: () => {
      dispatch({ type: FETCH_TODOS_REQUEST })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
