import { call, takeLatest, put, all } from 'redux-saga/effects'
import { login, register } from '../api/auth'
import { SetStorage } from '../config/configureStore'
import { REMOVE_EMOTIONS } from './emotion'
import { REMOVE_EXPLORER } from './explore'
import { REMOVE_ALL_FEED } from './post'
import { REMOVE_SAVED } from './saved'
import { REMOVE_USERS } from './user'
import { REMOVE_ALL } from './me'
import { REMOVE_STORE_LIKE } from './like'

export const LOGIN_REQ = 'LOGIN_REQ'
export const LOGIN_SUCCESSFUL = 'LOGIN_SUCCESSFUL'
export const LOGIN_FALURE = 'LOGIN_FALURE'

export const REGISTER_REQ = 'REGISTER_REQ'
export const REGISTER_SUCCESSFUL = 'REGISTER_SUCCESSFUL'
export const REGISTER_FALURE = 'REGISTER_FALURE'
export const LOGOUT_REQ = 'LOGOUT_REQ'
export const LOGOUT_DONE = 'LOGOUT_DONE'

const initState = {
  owner: {},
  token: null,
  error: null
}

// sagas

export function* watchLogin() {
  yield takeLatest(LOGIN_REQ, startLogin)
}
export function* watchRegister() {
  yield takeLatest(REGISTER_REQ, startRegister)
}

export function* watchLogout() {
  yield takeLatest(LOGOUT_REQ, startLogout)
}

export function* startLogout() {
  yield all([
    put({ type: REMOVE_EMOTIONS }),
    put({ type: REMOVE_ALL_FEED }),
    put({ type: REMOVE_SAVED }),
    put({ type: REMOVE_USERS }),
    put({ type: REMOVE_ALL }),
    put({ type: REMOVE_EXPLORER }),
    put({ type: REMOVE_STORE_LIKE }),
    put({ type: LOGOUT_DONE }),
    SetStorage('LOGIN', {})
  ])
}

export function* startLogin({ username, password }) {
  const json = yield call(login, username, password)
  if (!json.error) {
    yield put({ type: LOGIN_SUCCESSFUL, data: json })
    yield SetStorage('LOGIN', {
      username,
      password
    })
    return
  }
  yield put({ type: LOGIN_FALURE, data: json })
}
export function* startRegister({ username, password, email, avatar, fullname }) {
  const json = yield call(register, username, password, email, fullname, avatar)
  if (!json.error) {
    yield put({ type: REGISTER_SUCCESSFUL, data: json })
    return
  }
  yield put({ type: REGISTER_FALURE, data: json })
}

// reducers

export const authReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        owner: data.user,
        token: data.token,
        error: null
      }
    case LOGIN_FALURE:
      return {
        ...state, error: data
      }
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        owner: data.user,
        token: data.token,
        error: null
      }
    case REGISTER_FALURE:
      return {
        ...state, error: data
      }
    case LOGOUT_DONE:
      return {
        ...state,
        ...initState
      }
    default:
      return state
  }
}

// actions

export const loginAccount = (username, password) => {
  return {
    type: LOGIN_REQ,
    username,
    password
  }
}
export const registerAccount = (username, password, email, fullname, avatar) => {
  return {
    type: REGISTER_REQ,
    username,
    password,
    email,
    fullname,
    avatar
  }
}

export const logoutAccount = () => {
  return {
    type: LOGOUT_REQ
  }
}

// all getter

export const getToken = state => {
  return state.auth.token
}

export const getOwner = state => {
  return state.auth.owner
}

export const getOwnerID = state => {
  return state.auth.owner.id
}
