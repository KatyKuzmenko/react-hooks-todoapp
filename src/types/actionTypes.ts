import { Todo } from './todosTypes'

export type LoadingAction = {
  type: string
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

export enum TodosActionsTypes {
  FETCH_TODOS_SUCCESS = 'todos/request-success',
  TOGGLE_ALL_TODOS_SUCCESS = 'todos/toggle-all-success',
  TODO_ADD_SUCCESS = 'todo/add-success',
  TODO_EDIT_SUCCESS = 'todo/edit-success',
  CLEAR_COMPLETED_SUCCESS = 'todos/clear-completed-success',
  DELETE_TODO_SUCCESS = 'todo/delete-success',
  FETCH_TODOS_REQUEST = 'todos/request/db',
  DELETE_TODO_REQUEST = 'todo/delete-db',
  TOGGLE_ALL_TODOS_REQUEST = 'todos/toggle-all/db',
  TODO_ADD_REQUEST = 'todo/add/db',
  TODO_TOGGLE_REQUEST = 'todo/toggle/db',
  TODO_EDIT_TITLE_REQUEST = 'todo/edit/db',
  CLEAR_COMPLETED_REQUEST = 'todos/clear-completed/db',
  FETCH_TODOS_FAILED = 'todos/request-failed',
  TOGGLE_ALL_TODOS_FAILED = 'todos/toggle-all-failed',
  TODO_ADD_FAILED = 'todo/add-failed',
  TODO_EDIT_FAILED = 'todo/edit-failed',
  CLEAR_COMPLETED_FAILED = 'todos/clear-completed-failed',
  DELETE_TODO_FAILED = 'todo/delete-failed',
}

export interface FetchTodosActionType {
  type: TodosActionsTypes.FETCH_TODOS_SUCCESS
  payload: Todo[]
}

export interface TodoAddActionType {
  type: TodosActionsTypes.TODO_ADD_SUCCESS
  payload: Todo
}

export interface ToggleAllActionType {
  type: TodosActionsTypes.TOGGLE_ALL_TODOS_SUCCESS
  payload: {
    iscompleted: boolean
  }
}

export interface DeleteTodoActionType {
  type: TodosActionsTypes.DELETE_TODO_SUCCESS
  payload: {
    id: number
  }
}

export interface EditTodoActionType {
  type: TodosActionsTypes.TODO_EDIT_SUCCESS
  payload: Todo
}

export interface ClearCompletedActionType {
  type: TodosActionsTypes.CLEAR_COMPLETED_SUCCESS
}

export type TodosActions =
  | FetchTodosActionType
  | TodoAddActionType
  | ToggleAllActionType
  | DeleteTodoActionType
  | EditTodoActionType
  | ClearCompletedActionType
