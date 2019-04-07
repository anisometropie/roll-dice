const API_URL = 'http://localhost:3001/'

export const apiCall = (request, requestType) => body => {
  let data
  switch (requestType) {
    case 'GET':
      data = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
      break
    case 'POST':
      data = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
      break
    default:
      console.log('invalid request type')
      break
  }
  return fetch(`${API_URL}${request}`, data)
}

export const api = {
  compute: apiCall('compute', 'POST')
}
