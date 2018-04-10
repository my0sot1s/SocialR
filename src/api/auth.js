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

export const register = async (username, password, email, avatar) => {
  let form = await PostForm(`register`, [
    { name: 'username', data: username },
    { name: 'password', data: password },
    { name: 'email', data: email },
    { name: 'avatar', data: avatar }
  ])
  let info = await form.json()
  return info
}
