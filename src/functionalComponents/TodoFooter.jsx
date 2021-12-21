import React from 'react'

export const TodoListFooter = ({ filterType }) => {
  const activeTodos = this.props.store.filter((todo) => !todo.iscompleted)
  const completedTodos = this.props.store.filter((todo) => todo.iscompleted)

  return (
    this.props.store.length > 0 && (
      <footer className='footer'>
        <span className='todo-count'>{activeTodos.length} items left</span>
        <ul className='filters'>
          <li>
            <a
              href='#/'
              className={filterType === 'all' ? 'selected' : ''}
              onClick={() => this.hanleFilterChange('all')}
            >
              All
            </a>
          </li>
          <li>
            <a
              href='#/active'
              className={filterType === 'active' ? 'selected' : ''}
              onClick={() => this.hanleFilterChange('active')}
            >
              Active
            </a>
          </li>
          <li>
            <a
              href='#/completed'
              className={filterType === 'completed' ? 'selected' : ''}
              onClick={() => this.hanleFilterChange('completed')}
            >
              Completed
            </a>
          </li>
        </ul>
        {completedTodos.length > 0 && (
          <button className='clear-completed' onClick={this.clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    )
  )
}
