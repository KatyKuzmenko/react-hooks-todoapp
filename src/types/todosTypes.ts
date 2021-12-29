export interface Todo {
  id: number
  title: string
  iscompleted: boolean
}

export type CurrentTodos = {
  [key: string]: Todo[]
}

export enum FilterOptions {
  ALL = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}
