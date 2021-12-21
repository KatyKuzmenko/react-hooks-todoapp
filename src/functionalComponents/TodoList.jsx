import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { getTodos, toggleAllTodos } from '../api/api'
import { TODOS_INIT, TODOS_TOGGLE_ALL } from '../store/actionTypes'
import { Loader } from './Loader'
import { Modal } from './Modal'
import { Todo } from './Todo'
import { TodoListFooter } from './TodoFooter'

const TodoList = () => {
  const [filterType, setFilterType] = useState('all')
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [idToRemove, setIdToRemove] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    getTodos()
      .then((todosFromServer) => {
        this.props.onInitialize(todosFromServer)
        setIsLoading(false)
      })
      .catch((err) => console.warn(err))
  }, [])

  const toggleAll = (event) => {
    setIsLoading(true)
    toggleAllTodos(event.target.checked)
      .then((todos) => {
        this.props.onToggleAll(todos)
        setIsLoading(false)
      })
      .catch((err) => console.warn(err))
  }

  const activeTodos = this.props.store.filter((todo) => !todo.iscompleted)
  const completedTodos = this.props.store.filter((todo) => todo.iscompleted)

  const currentTodos = {
    all: this.props.store,
    active: activeTodos,
    completed: completedTodos,
  }

  const visibleTodos = currentTodos[filterType]
  return (
    <>
      <section className={this.props.store.length > 0 ? 'main' : 'main invisible'}>
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
                onLoading={setIsLoading}
                handleModal={setIsModalOpened}
                setIdToRemove={setIdToRemove}
              />
            ))}
          </ul>
        </span>
      </section>
      <TodoListFooter
        filterType={filterType}
        onFiltering={setFilterType}
        onLoading={setIsLoading}
      />
      {isLoading && <Loader />}
      {isModalOpened && (
        <Modal onLoading={setIsLoading} handleModal={setIsModalOpened} idToRemove={idToRemove} />
      )}
    </>
  )
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    onToggleAll: (iscompleted) => {
      dispatch({ type: TODOS_TOGGLE_ALL, options: { iscompleted } })
    },
    onInitialize: (todos) => {
      dispatch({ type: TODOS_INIT, options: todos })
    },
  })
)(TodoList)
