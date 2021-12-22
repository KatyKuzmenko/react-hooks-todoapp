import React from 'react'
import { connect } from 'react-redux'
import { deleteCompletedTodos } from '../api/api'
import { TODOS_CLEAR_COMPLETED } from '../store/actionTypes'

const mapStateToProps = (state) => {
  return {
    todos: state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearAction: () => {
      dispatch({ type: TODOS_CLEAR_COMPLETED })
    },
  }
}

const TodoListFooter = (props) => {
  const { filterType, setFilterType, setIsLoading } = props
  const activeTodos = props.todos.filter((todo) => !todo.iscompleted)
  const completedTodos = props.todos.filter((todo) => todo.iscompleted)

  const clearCompletedTodos = () => {
    setIsLoading(true)
    deleteCompletedTodos().then(() => {
      props.clearAction()
      setIsLoading(false)
    })
  }

  return (
    props.todos.length > 0 && (
      <footer className='footer'>
        <span className='todo-count'>{activeTodos.length} items left</span>
        <ul className='filters'>
          <li>
            <a
              href='#/'
              className={filterType === 'all' ? 'selected' : ''}
              onClick={() => setFilterType('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href='#/active'
              className={filterType === 'active' ? 'selected' : ''}
              onClick={() => setFilterType('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href='#/completed'
              className={filterType === 'completed' ? 'selected' : ''}
              onClick={() => setFilterType('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {completedTodos.length > 0 && (
          <button className='clear-completed' onClick={clearCompletedTodos}>
            Clear completed
          </button>
        )}
      </footer>
    )
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListFooter)
