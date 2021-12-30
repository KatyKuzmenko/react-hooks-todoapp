import { LoadingAction, TodosActionsTypes } from "../types/actionTypes"
import { LoadingState } from "../types/StatesTypes"

const initialState: LoadingState = {
  loading: false,
}

export const appReducer = (
  state = initialState,
  action: LoadingAction
): LoadingState => {
  switch (action.type) {
    case TodosActionsTypes.TODO_ADD_REQUEST:
    case TodosActionsTypes.FETCH_TODOS_REQUEST:
    case TodosActionsTypes.DELETE_TODO_REQUEST:
    case TodosActionsTypes.TOGGLE_ALL_TODOS_REQUEST:
    case TodosActionsTypes.CLEAR_COMPLETED_REQUEST:
    case TodosActionsTypes.TODO_TOGGLE_REQUEST:
    case TodosActionsTypes.TODO_EDIT_TITLE_REQUEST:
    case TodosActionsTypes.GET_TOKEN_REQUEST:
      return { ...state, loading: true }

    case TodosActionsTypes.FETCH_TODOS_SUCCESS:
    case TodosActionsTypes.DELETE_TODO_SUCCESS:
    case TodosActionsTypes.TOGGLE_ALL_TODOS_SUCCESS:
    case TodosActionsTypes.CLEAR_COMPLETED_SUCCESS:
    case TodosActionsTypes.TODO_ADD_SUCCESS:
    case TodosActionsTypes.TODO_EDIT_SUCCESS:
    case TodosActionsTypes.FETCH_TODOS_FAILED:
    case TodosActionsTypes.TOGGLE_ALL_TODOS_FAILED:
    case TodosActionsTypes.TODO_ADD_FAILED:
    case TodosActionsTypes.TODO_EDIT_FAILED:
    case TodosActionsTypes.CLEAR_COMPLETED_FAILED:
    case TodosActionsTypes.DELETE_TODO_FAILED:
      return { ...state, loading: false }

    default:
      return state
  }
}
