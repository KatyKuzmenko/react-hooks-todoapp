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

export const getTodos = () => request('/todos')

export const getTodo = (todoId) => request(`/todos/${todoId}`)
