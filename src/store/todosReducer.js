import {
  FETCH_TODOS_SUCCESS,
  DELETE_TODO_SUCCESS,
  TODO_ADD_SUCCESS,
  TODO_EDIT_SUCCESS,
  TOGGLE_ALL_TODOS_SUCCESS,
  CLEAR_COMPLETED_SUCCESS,
} from './actionTypes'

export default function todosReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TODOS_SUCCESS:
      return [...action.payload]

    case TODO_ADD_SUCCESS:
      return [...state, action.payload]

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
