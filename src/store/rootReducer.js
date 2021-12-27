import {combineReducers} from 'redux'
import todosReducer from './todosReducer'
import { appReducer } from './appReducer'

export const rootReducer = combineReducers({
  todos: todosReducer,
  app: appReducer
})