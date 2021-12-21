import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { createStore, applyMiddleware } from 'redux'
import todosReducer from './store/reducer'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

export const store = createStore(todosReducer, applyMiddleware(logger))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
