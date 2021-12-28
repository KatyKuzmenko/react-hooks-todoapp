import { put, takeEvery, call } from 'redux-saga/effects'
import { callApi } from '../api/api'
import { AddTodoPayload, DeleteTodoPayload, EditTodoPayload, Todo, ToggleAllPayload } from '../types/types'
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  TOGGLE_ALL_TODOS_REQUEST,
  TOGGLE_ALL_TODOS_SUCCESS,
  CLEAR_COMPLETED_REQUEST,
  CLEAR_COMPLETED_SUCCESS,
  TODO_ADD_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_TOGGLE_REQUEST,
  TODO_EDIT_TITLE_REQUEST,
  TODO_EDIT_SUCCESS,
  FETCH_TODOS_FAILED,
  DELETE_TODO_FAILED,
  TOGGLE_ALL_TODOS_FAILED,
  CLEAR_COMPLETED_FAILED,
  TODO_ADD_FAILED,
  TODO_EDIT_FAILED,
} from './actionTypes'

function* fetchTodos(): Generator {
  try {
    const payload = yield call(callApi, '/todos')
    yield put({ type: FETCH_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: FETCH_TODOS_FAILED })
  }
}

function* deleteTodo({ payload }: { payload: DeleteTodoPayload; type: string }) {
  try {
    yield call(callApi, `/todos/${payload.id}`, { method: 'DELETE' })
    yield put({ type: DELETE_TODO_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: DELETE_TODO_FAILED })
  }
}

function* toggleAll({ payload }: {payload: ToggleAllPayload; type: string}) {
  try {
    yield call(callApi, '/todos', {
      method: 'PATCH',
      body: payload,
    })
    yield put({ type: TOGGLE_ALL_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TOGGLE_ALL_TODOS_FAILED })
  }
}

function* clearCompleted() {
  try {
    yield call(callApi, '/todos', { method: 'DELETE' })
    yield put({ type: CLEAR_COMPLETED_SUCCESS })
  } catch (err) {
    console.warn(err)
    yield put({ type: CLEAR_COMPLETED_FAILED })
  }
}

function* addTodo({ options }: {options: AddTodoPayload; type: string}) {
  try {
    const payload: AddTodoPayload = yield call(callApi, '/todos', {
      method: 'POST',
      body: options,
    })
    yield put({ type: TODO_ADD_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TODO_ADD_FAILED })
  }
}

function* editTodo({ options }: {options: Todo; type: string}) {
  try {
    const payload: EditTodoPayload = yield call(callApi, `/todos/${options.id}`, {
      method: 'PATCH',
      body: options,
    })
    yield put({ type: TODO_EDIT_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TODO_EDIT_FAILED })
  }
}

export function* todosWatcher() {
  yield takeEvery(FETCH_TODOS_REQUEST, fetchTodos)
  yield takeEvery(TOGGLE_ALL_TODOS_REQUEST, toggleAll)
  yield takeEvery(DELETE_TODO_REQUEST, deleteTodo)
  yield takeEvery(CLEAR_COMPLETED_REQUEST, clearCompleted)
  yield takeEvery(TODO_ADD_REQUEST, addTodo)
  yield takeEvery(TODO_TOGGLE_REQUEST, editTodo)
  yield takeEvery(TODO_EDIT_TITLE_REQUEST, editTodo)
}
