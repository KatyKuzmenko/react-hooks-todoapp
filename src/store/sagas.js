import { put, takeEvery, call } from 'redux-saga/effects'
import { callApi } from '../api/api'
import {
  FETCH_TODOS_REQUEST,
  FETCH_TODOS_SUCCESS,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  TOGGLE_ALL_TODOS_SUCCESS,
  TOGGLE_ALL_TODOS_REQUEST,
  CLEAR_COMPLETED_SUCCESS,
  CLEAR_COMPLETED_REQUEST,
  TODO_ADD_SUCCESS,
  TODO_ADD_REQUEST,
  TODO_EDIT_TITLE_REQUEST,
  TODO_EDIT_SUCCESS,
  TODO_TOGGLE_REQUEST,
} from './actionTypes'

function* fetchTodos() {
  try {
    const payload = yield call(callApi, '/todos')
    yield put({ type: FETCH_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
  }
}

function* deleteTodo({ payload }) {
  try {
    yield call(callApi, `/todos/${payload.id}`, { method: 'DELETE' })
    yield put({ type: DELETE_TODO_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
  }
}

function* toggleAll({ payload }) {
  try {
    yield call(callApi, '/todos', {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(payload),
    })
    yield put({ type: TOGGLE_ALL_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
  }
}

function* clearCompleted() {
  try {
    yield call(callApi, '/todos', { method: 'DELETE' })
    yield put({ type: CLEAR_COMPLETED_SUCCESS })
  } catch (err) {
    console.warn(err)
  }
}

function* addTodo({options}) {
  try {
    const payload = yield call(callApi, '/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(options),
    })
    yield put({ type: TODO_ADD_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
  }
}

function* editTodo({options}) {
  try {
    const payload = yield call(callApi, `/todos/${options.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(options),
    })
    yield put({ type: TODO_EDIT_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
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
