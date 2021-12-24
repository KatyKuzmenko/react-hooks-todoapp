const BASE_URL = 'http://localhost:3001'

export async function callApi(url, options) {
  const response = await fetch(`${BASE_URL}${url}`, options)
  return response.json()
}
