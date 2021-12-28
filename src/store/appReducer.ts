import {
  TODO_ADD_REQUEST,
  FETCH_TODOS_REQUEST,
  DELETE_TODO_REQUEST,
  TOGGLE_ALL_TODOS_REQUEST,
  CLEAR_COMPLETED_REQUEST,
  TODO_TOGGLE_REQUEST,
  TODO_EDIT_TITLE_REQUEST,
  FETCH_TODOS_SUCCESS,
  DELETE_TODO_SUCCESS,
  TOGGLE_ALL_TODOS_SUCCESS,
  CLEAR_COMPLETED_SUCCESS,
  TODO_ADD_SUCCESS,
  TODO_EDIT_SUCCESS,
  FETCH_TODOS_FAILED,
  TOGGLE_ALL_TODOS_FAILED,
  TODO_ADD_FAILED,
  TODO_EDIT_FAILED,
  CLEAR_COMPLETED_FAILED,
  DELETE_TODO_FAILED,
} from './actionTypes'

type LoadingAction = {
  type: string,
}

type LoadingState = {
  loading: boolean
}

const initialState: LoadingState = {
  loading: false,
}

export const appReducer = (state: LoadingState = initialState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    case TODO_ADD_REQUEST:
    case FETCH_TODOS_REQUEST:
    case DELETE_TODO_REQUEST:
    case TOGGLE_ALL_TODOS_REQUEST:
    case CLEAR_COMPLETED_REQUEST:
    case TODO_TOGGLE_REQUEST:
    case TODO_EDIT_TITLE_REQUEST:
      return { ...state, loading: true }
    case FETCH_TODOS_SUCCESS:
    case DELETE_TODO_SUCCESS:
    case TOGGLE_ALL_TODOS_SUCCESS:
    case CLEAR_COMPLETED_SUCCESS:
    case TODO_ADD_SUCCESS:
    case TODO_EDIT_SUCCESS:
    case FETCH_TODOS_FAILED:
    case TOGGLE_ALL_TODOS_FAILED:
    case TODO_ADD_FAILED:
    case TODO_EDIT_FAILED:
    case CLEAR_COMPLETED_FAILED:
    case DELETE_TODO_FAILED:
      return { ...state, loading: false }
    default:
      return state
  }
}
