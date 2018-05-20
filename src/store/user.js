import {
  call,
  takeEvery,
  put,
  select
} from 'redux-saga/effects'
import { fetchUserById, fetchUserByIDs, searchUserWithQuery } from '../api/user'
import { getOwner, getOwnerID } from './auth'
export const FETCH_USER = 'FETCH_USER'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const FETCH_USER_FALURE = 'FETCH_USER_FALURE'
export const FETCH_MULTIPLE_USER = 'FETCH_MULTIPLE_USER'
export const FETCH_MULTIPLE_USER_SUCCESS = 'FETCH_MULTIPLE_USER_SUCCESS'
export const FETCH_MULTIPLE_USER_FAILURE = 'FETCH_MULTIPLE_USER_FAILURE'
export const REMOVE_USERS = 'REMOVE_USERS'
export const REMOVE_USERS_SUCCESS = 'REMOVE_USERS_SUCCESS'

export const SEARCH_USERS = 'SEARCH_USERS'
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS'

const objectPath = require('object-path')
const uniq = require('lodash/uniq')
const uniqBy = require('lodash/uniqBy')

const initState = {
  users: [],
  error: null,
  userSearched: []
}

export function* watchFetchUser() {
  yield takeEvery(FETCH_USER, startFetchUser)
}

export function* watchRemoveUsers() {
  yield takeEvery(REMOVE_USERS, removeUsers)
}

export function* watchSearchUsers() {
  yield takeEvery(SEARCH_USERS, searchUsers)
}

export function* watchFetchMultipleUsers() {
  yield takeEvery(FETCH_MULTIPLE_USER, startFetchMultipleUsers)
}

export function* removeUsers() {
  yield put({
    type: REMOVE_USERS_SUCCESS
  })
}
export function* searchUsers({ query }) {
  try {
    let ownerId = yield select(getOwnerID)
    const json = yield call(searchUserWithQuery, ownerId, query)
    yield put({ type: SEARCH_USERS_SUCCESS, data: json })
  } catch (error) {
    console.log(error)
  }
}

export function* startFetchUser({ uid }) {
  try {
    let checkuser = yield select(findUser(uid))
    if (checkuser) return
    const json = yield call(fetchUserById, uid)
    yield put({ type: FETCH_USER_SUCCESS, data: json })
  } catch (error) {
    yield put({ type: FETCH_USER_FALURE, error })
  }
}

export function* startFetchMultipleUsers({ listUsers }) {
  try {
    listUsers = uniq(listUsers)
    // remove user exist on list
    let users = yield select(getUsers) || []
    if (!listUsers || !Array.isArray(listUsers)) return
    let listUsersNotExisted = listUsers.filter(u => {
      let isExist = users.some(usr => usr.id === u)
      if (!isExist) return u
    })
    const json = yield call(fetchUserByIDs, listUsersNotExisted)
    yield put({ type: FETCH_MULTIPLE_USER_SUCCESS, data: json })
  } catch (error) {
    yield put({ type: FETCH_MULTIPLE_USER_FAILURE, error })
  }
}

export const usersReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, data.user]
      }
    case FETCH_USER_FALURE:
      return {
        ...state, error: data
      }
    case FETCH_MULTIPLE_USER_SUCCESS:
      let userClone = uniqBy([...state.users, ...objectPath.get(data, 'users', [])], 'id')
      return {
        ...state,
        users: userClone
      }
    case FETCH_MULTIPLE_USER_FAILURE:
      return {
        ...state, error: data
      }
    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        userSearched: objectPath.get(data, 'users', [])
      }
    case REMOVE_USERS_SUCCESS:
      return initState
    default:
      return state
  }
}

// actions

export const fetchUser = (uid) => {
  return {
    type: FETCH_USER,
    uid
  }
}

export const fetchMultipleUsers = (listUsers) => {
  return {
    type: FETCH_MULTIPLE_USER,
    listUsers
  }
}

export const searchUserInfo = (query) => {
  return {
    type: SEARCH_USERS,
    query
  }
}

// getter

export const getUsers = state => {
  return [...state.user.users, getOwner(state), ...getUsersSearched(state)]
}

export const getUsersSearched = state => {
  return state.user.userSearched
}

export const findUser = state => uid => {
  let user = state.user.users.find(u => u.id === uid)
  if (!user && uid === getOwner(state).id) {
    return getOwner(state)
  }
  return user
}
