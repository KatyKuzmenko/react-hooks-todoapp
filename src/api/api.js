const BASE_URL = 'http://localhost:3001'

export async function callApi(url, options = { method: 'GET'}) {
  const { method, body } = options
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    ...(body ? {body: JSON.stringify(body)} : {}),
  })

  if (!response.ok) {
    return `${response.status} - ${response.statusText}`
  }

  return response.json()
}
