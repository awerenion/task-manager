import * as TYPES from './types'
const tasksURL = 'https://fierce-chamber-24988.herokuapp.com/api/tasks'

function sendRequest (method, url, body, headers) {
  return fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(body)
  })
    .then(response => {
      if (response.ok) {
        const isJson = response.headers.get('content-type').includes('application/json')
        const data = isJson ? response.json() : null
        return data
      }
      return response.json().then(error => {
        throw error
      })
    })
}

export const getTasks = ({ commit }, userid) => {
  sendRequest('GET', tasksURL, undefined, { userid })
    .then(res => {
      commit(TYPES.SET_TASKS, res)
    })
    .catch(() => {
      commit(TYPES.SET_TASKS, [])
    })
}

export const createNewTask = (_, task) => {
  sendRequest('POST', tasksURL, { title: task.title, body: task.body }, { userid: task.userid })
    .then(() => {
      getTasks(_, task.userid)
    })
    .catch(() => {
      console.error('Ошибка при создании задачи')
    })
}

export const editBodyTask = (_, task) => {
  sendRequest('PATCH', tasksURL, { body: task.body, _id: task._id }, { userid: task.userid })
    .then(() => {
      getTasks(_, task.userid)
    })
    .catch(() => {
      console.error('Ошибка при изменении описания')
    })
}

export const setUserID = ({ commit }) => {
  let userid = localStorage.getItem('userID')
  if (!userid) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    userid = Array.from({ length: 6 }, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('')
    localStorage.setItem('userID', userid)
  }
  commit(TYPES.SET_USERID, userid)
}
