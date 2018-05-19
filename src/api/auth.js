import {
  PostForm
} from './common'

export const login = async (username, password) => {
  let form = await PostForm(`login`, [
    { name: 'username', data: username },
    { name: 'password', data: password }
  ])
  let auth = await form.json()
  return auth
}

export const register = async (username, password, email, fullname, avatar) => {
  let form = await PostForm(`register`, [
    { name: 'username', data: username },
    { name: 'password', data: password },
    { name: 'email', data: email },
    { name: 'avatar', data: avatar },
    { name: 'fullname', data: fullname }
  ])
  let info = await form.json()
  return info
}
