import { Todo } from './todosTypes'

export type TodosState = Todo[]

export type LoadingState = {
  loading: boolean
}

export type State = {
  todos: Todo[]
  app: {
    loading: boolean
  }
}
