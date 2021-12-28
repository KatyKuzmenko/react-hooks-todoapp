export interface Todo {
  id: number
  title: string
  iscompleted: boolean
}

export type CurrentTodos = {
  [key: string]: Todo[]
}

export type TodosState = Todo[]

export type State = {
  todos: Todo[] 
  app: {
    loading: boolean
  }
}

export type DeleteTodoPayload = {
  id: number
}

export type ToggleAllPayload = {
  iscompleted: boolean
}

export type AddTodoPayload = {
  todo: Todo
}

export type EditTodoPayload = {
  todo: Todo
}
