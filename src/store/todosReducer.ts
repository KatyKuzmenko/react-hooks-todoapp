import { DeleteTodoPayload, Todo, TodosState, ToggleAllPayload } from '../types/types'
import {
  FETCH_TODOS_SUCCESS,
  DELETE_TODO_SUCCESS,
  TODO_ADD_SUCCESS,
  TODO_EDIT_SUCCESS,
  TOGGLE_ALL_TODOS_SUCCESS,
  CLEAR_COMPLETED_SUCCESS,
} from './actionTypes'

type FetchActionType = {
  type: typeof FETCH_TODOS_SUCCESS
  payload: FetchActionType
}

type TodoAddActionType = {
  type: typeof TODO_ADD_SUCCESS
  payload: TodoAddActionType
}

type DeleteTodoActionType = {
  type: typeof DELETE_TODO_SUCCESS
  payload: {
    id: DeleteTodoPayload
  }
}

type TodoEditActionType = {
  type: typeof TODO_EDIT_SUCCESS
  payload: TodoEditActionType
}

type ToggleAllActionType = {
  type: typeof TOGGLE_ALL_TODOS_SUCCESS
  payload: ToggleAllPayload
}

type ClearCompletedActionType = {
  type: typeof CLEAR_COMPLETED_SUCCESS
  payload: null 
}

type Action = FetchActionType | TodoAddActionType | DeleteTodoActionType | TodoEditActionType | ToggleAllActionType | ClearCompletedActionType

export default function todosReducer(state: TodosState = [], action: Action): TodosState {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return [...action.payload]

    case TODO_ADD_SUCCESS:
      return [...state, action.payload.]

    case DELETE_TODO_SUCCESS:
      return state.filter((todo) => action.payload.id !== todo.id)

    case TODO_EDIT_SUCCESS:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...action.payload }
        }

        return task
      })

    case TOGGLE_ALL_TODOS_SUCCESS:
      return state.map((todo) => {
        return { ...todo, iscompleted: action.payload.iscompleted }
      })

    case CLEAR_COMPLETED_SUCCESS:
      return state.filter((todo) => todo.iscompleted === false)

    default:
      return state
  }
}
