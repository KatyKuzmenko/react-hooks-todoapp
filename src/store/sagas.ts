import { put, takeEvery, call } from 'redux-saga/effects'
import { callApi } from '../api/api'
import { AddTodoPayload, DeleteTodoPayload, EditTodoPayload, TodosActionsTypes, ToggleAllPayload } from '../types/actionTypes'
import { Todo } from '../types/todosTypes'


function* fetchTodos(): Generator {
  try {
    const payload = yield call(callApi, '/todos')
    yield put({ type: TodosActionsTypes.FETCH_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.FETCH_TODOS_FAILED })
  }
}

function* deleteTodo({ payload }: { payload: DeleteTodoPayload; type: string }) {
  try {
    yield call(callApi, `/todos/${payload.id}`, { method: 'DELETE' })
    yield put({ type: TodosActionsTypes.DELETE_TODO_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.DELETE_TODO_FAILED })
  }
}

function* toggleAll({ payload }: { payload: ToggleAllPayload; type: string }) {
  try {
    yield call(callApi, '/todos', {
      method: 'PATCH',
      body: payload,
    })
    yield put({ type: TodosActionsTypes.TOGGLE_ALL_TODOS_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.TOGGLE_ALL_TODOS_FAILED })
  }
}

function* clearCompleted() {
  try {
    yield call(callApi, '/todos', { method: 'DELETE' })
    yield put({ type: TodosActionsTypes.CLEAR_COMPLETED_SUCCESS })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.CLEAR_COMPLETED_FAILED })
  }
}

function* addTodo({ options }: { options: AddTodoPayload; type: string }) {
  try {
    const payload: AddTodoPayload = yield call(callApi, '/todos', {
      method: 'POST',
      body: options,
    })
    yield put({ type: TodosActionsTypes.TODO_ADD_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.TODO_ADD_FAILED })
  }
}

function* editTodo({ options }: { options: Todo; type: string }) {
  try {
    const payload: EditTodoPayload = yield call(callApi, `/todos/${options.id}`, {
      method: 'PATCH',
      body: options,
    })
    yield put({ type: TodosActionsTypes.TODO_EDIT_SUCCESS, payload })
  } catch (err) {
    console.warn(err)
    yield put({ type: TodosActionsTypes.TODO_EDIT_FAILED })
  }
}

export function* todosWatcher() {
  yield takeEvery(TodosActionsTypes.FETCH_TODOS_REQUEST, fetchTodos)
  yield takeEvery(TodosActionsTypes.TOGGLE_ALL_TODOS_REQUEST, toggleAll)
  yield takeEvery(TodosActionsTypes.DELETE_TODO_REQUEST, deleteTodo)
  yield takeEvery(TodosActionsTypes.CLEAR_COMPLETED_REQUEST, clearCompleted)
  yield takeEvery(TodosActionsTypes.TODO_ADD_REQUEST, addTodo)
  yield takeEvery(TodosActionsTypes.TODO_TOGGLE_REQUEST, editTodo)
  yield takeEvery(TodosActionsTypes.TODO_EDIT_TITLE_REQUEST, editTodo)
}
