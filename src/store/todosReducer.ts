import { TodosActions, TodosActionsTypes } from "../types/actionTypes"
import { TodosState } from "../types/StatesTypes"

export default function todosReducer(state: TodosState = [], action: TodosActions): TodosState {
  switch (action.type) {
    case TodosActionsTypes.FETCH_TODOS_SUCCESS:
      return [...action.payload]

    case TodosActionsTypes.TODO_ADD_SUCCESS:
      return [...state, action.payload]

    case TodosActionsTypes.DELETE_TODO_SUCCESS:
      return state.filter((todo) => action.payload.id !== todo.id)

    case TodosActionsTypes.TODO_EDIT_SUCCESS:
      return state.map((task) => {
        if (task.id === action.payload.id) {
          return { ...action.payload }
        }

        return task
      })

    case TodosActionsTypes.TOGGLE_ALL_TODOS_SUCCESS:
      return state.map((todo) => {
        return { ...todo, iscompleted: action.payload.iscompleted }
      })

    case TodosActionsTypes.CLEAR_COMPLETED_SUCCESS:
      return state.filter((todo) => todo.iscompleted === false)

    default:
      return state
  }
}
