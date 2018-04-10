import { call, takeLatest, put } from 'redux-saga/effects'
import { login, register } from '../api/auth'
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
  put({ type: LOGOUT_REQ })
}

export function* startLogin({ username, password }) {
  try {
    const json = yield call(login, username, password)
    yield put({ type: LOGIN_SUCCESSFUL, data: json })
  } catch (error) {
    yield put({ type: LOGIN_FALURE, error })
  }
}
export function* startRegister({ username, password, email, avatar }) {
  try {
    const json = yield call(register, username, password, email, avatar)
    yield put({ type: REGISTER_SUCCESSFUL, data: json })
  } catch (error) {
    yield put({ type: REGISTER_FALURE, error })
  }
}

// reducers

export const authReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        owner: data.user,
        token: data.token
      }
    case LOGIN_FALURE:
      return {
        ...state, error: data
      }
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        owner: data.user,
        token: data.token
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
export const registerAccount = (username, password, email, avatar) => {
  return {
    type: REGISTER_REQ,
    username,
    password,
    email,
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
