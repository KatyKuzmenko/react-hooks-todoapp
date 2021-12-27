import React, { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { CLEAR_COMPLETED_REQUEST } from '../store/actionTypes'

const TodoListFooter = ({ filterType, setFilterType, clearCompletedTasks, todos }) => {
  const activeTodos = useMemo(() => {
    return todos.filter((todo) => !todo.iscompleted)
  }, [todos])
  const completedTodos = useMemo(() => {
    return todos.filter((todo) => todo.iscompleted)
  }, [todos])

  const clearCompletedTodos = useCallback(() => {
    clearCompletedTasks()
  }, [todos])

  return (
    todos.length > 0 && (
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

const mapStateToProps = (state) => {
  return {
    todos: state.todos,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCompletedTasks: () => {
      dispatch({ type: CLEAR_COMPLETED_REQUEST })
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoListFooter)
