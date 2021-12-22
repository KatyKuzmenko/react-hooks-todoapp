import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getTodos, toggleAllTodos } from '../api/api'
import { TODOS_INIT, TODOS_TOGGLE_ALL } from '../store/actionTypes'
import { Loader } from './Loader'
import Modal from './Modal'
import Todo from './Todo'
import TodoListFooter from './TodoFooter'

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleAllDispatch: (iscompleted) => {
      dispatch({ type: TODOS_TOGGLE_ALL, options: { iscompleted } })
    },
    initializeStoreData: (todos) => {
      dispatch({ type: TODOS_INIT, options: todos })
    },
  }
}

const TodoList = (props) => {
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [idToRemove, setIdToRemove] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    getTodos()
      .then((todosFromServer) => {
        props.initializeStoreData(todosFromServer)
      })
      .catch((err) => console.warn(err))
    setIsLoading(false)
  }, [])

  const toggleAll = (event) => {
    setIsLoading(true)
    toggleAllTodos(event.target.checked)
      .then((todos) => {
        props.toggleAllDispatch(todos)
        setIsLoading(false)
      })
      .catch((err) => console.warn(err))
  }

  const activeTodos = props.todos.filter((todo) => !todo.iscompleted)
  const completedTodos = props.todos.filter((todo) => todo.iscompleted)
  const currentTodos = {
    all: props.todos,
    active: activeTodos,
    completed: completedTodos,
  }
  const visibleTodos = currentTodos[filterType]

  return (
    <>
      <section className={props.todos.length > 0 ? 'main' : 'main invisible'}>
        <span className='toggle-all-container'>
          <input
            id='toggle-all'
            className='toggle-all'
            type='checkbox'
            checked={activeTodos.length === 0}
            onChange={toggleAll}
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

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
