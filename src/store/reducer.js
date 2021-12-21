import {
  TODOS_INIT,
  TODO_ADD,
  TODO_DELETE,
  TODOS_CLEAR_COMPLETED,
  TODOS_TOGGLE_ALL,
  TODO_EDIT,
} from './actionTypes'

export default function todosReducer(state = [], action) {
  switch (action.type) {
    case TODOS_INIT:
      return [...action.options]

    case TODO_ADD:
      return [...state, action.options]

    case TODO_DELETE:
      return state.filter((todo) => action.options.id !== todo.id)

    case TODO_EDIT:
      return state.map((task) => {
        if (task.id === action.options.id) {
          return { ...action.options }
        }

        return task
      })

    case TODOS_TOGGLE_ALL:
      return state.map((todo) => {
        return { ...todo, iscompleted: action.options.iscompleted }
      })

    case TODOS_CLEAR_COMPLETED:
      return state.filter((todo) => todo.iscompleted === false)

    default:
      return state
  }
}
