import { OptionsType } from "../types/apiTypes"

const BASE_URL: string = 'http://localhost:3001'

export async function callApi(url: string, options: OptionsType = { method: 'GET'}): Promise<Response> {
  const { method, body, params } = options
  const response = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    ...(body ? {body: JSON.stringify(body)} : {}),
    ...(params ? {params: JSON.stringify(params)} : {}),
  })

  return response.ok
    ? response.json()
    : `${response.status} - ${response.statusText}`
}
