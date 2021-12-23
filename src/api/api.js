const BASE_URL = 'http://localhost:3001'

const request = (url, options) => {
  return fetch(`${BASE_URL}${url}`, options).then((response) => {
    if (!response.ok) {
      return `${response.status} - ${response.statusText}`
    }

    return response.json()
  })
}
export async function callApi(url, options) {
  const response = await fetch(`${BASE_URL}${url}`, options)
  return response.json()
}

export async function fetchTodos() {
  return callApi('/todos')
}

export async function deleteTodo(todoId) {
  const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
    method: 'DELETE'
  })
  return await response.json()
}

const remove = (url) => {
  return request(url, {
    method: 'DELETE',
  })
}

const post = (url, data) => {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
}

const patch = (url, data) => {
  return request(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
}

export const createTodo = (title) => {
  return post('/todos', { title })
}

export const updateTodo = (todo) => {
  return patch(`/todos/${todo.id}`, todo)
}

export const toggleAllTodos = (iscompleted) => {
  return patch('/todos', { iscompleted })
}

// export const deleteTodo = (todoId) => {
//   return remove(`/todos/${todoId}`)
// }

export const deleteCompletedTodos = () => {
  return remove('/todos/')
}

export const getTodos = () => request('/todos')

export const getTodo = (todoId) => request(`/todos/${todoId}`)
