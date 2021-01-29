export const BASE_URL = "https://strangers-things.herokuapp.com/api/2010-CPU-RM-WEB-PT"

export async function fetchPosts(token) {
    return fetch(BASE_URL + '/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            return data
        })
        .catch(error => console.log(error))
}