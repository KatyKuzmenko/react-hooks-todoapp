const BASE_URL: string = 'http://localhost:3001'
type OptionsType = {
  method: string
  body?: any
}
export async function callApi(url: string, options: OptionsType = { method: 'GET'}): Promise<Response | string> {
  const { method, body } = options
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {'Content-type': 'application/json; charset=UTF-8'},
    ...(body ? {body: JSON.stringify(body)} : {}),
  })

  return response.ok
    ? response.json()
    : `${response.status} - ${response.statusText}`
}
