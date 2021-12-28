import React from 'react'
import ReactDOM from 'react-dom'
import { TodoApp } from './TodoApp'
import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from './store/rootReducer'
import { Provider } from 'react-redux'
import createSagaMiddleware from '@redux-saga/core'
import { todosWatcher } from './store/sagas'

export const sagaMiddleware = createSagaMiddleware()
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(todosWatcher)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <TodoApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
