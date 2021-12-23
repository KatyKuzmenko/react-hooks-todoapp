import React from 'react'
import ReactDOM from 'react-dom'
import { TodoApp } from './TodoApp'
import { createStore, applyMiddleware } from 'redux'
import todosReducer from './store/reducer'
import { Provider } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core'

export const sagaMiddleware = createSagaMiddleware()
export const store = createStore(todosReducer, applyMiddleware(sagaMiddleware))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
