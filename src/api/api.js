const BASE_URL = 'http://localhost:3001'

export async function callApi(url, options = { method: 'GET' }) {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    body: JSON.stringify(options.body)
  })
  return response.json()
}
