import {
  call, takeLatest, put,
  select,
  all,
  takeEvery
} from 'redux-saga/effects'
import { fetchSavedData } from '../api/saved'
import { getPostById } from '../api/post'
import { getOwnerID } from './auth'
import { FETCH_MULTIPLE_USER } from '../store/user'
export const FETCH_SAVED = 'FETCH_SAVED'
export const FETCH_SAVED_SUCCESSFUL = 'FETCH_SAVED_SUCCESSFUL'
export const FETCH_SAVED_FALURE = 'FETCH_SAVED_FALURE'
export const REMOVE_SAVED = 'REMOVE_SAVED'
export const REMOVE_SAVED_SUCCESS = 'REMOVE_SAVED_SUCCESS'

const objectPath = require('object-path')
const cloneDeep = require('lodash/cloneDeep')
const initState = {
  limit: -100,
  posts: [],
  anchor: '',
  topAnchor: '',
  error: null,
  locked: false
}

export function* watchFetchSaved() {
  yield takeEvery(FETCH_SAVED, fetchSaved)
}
export function* watchRemoveSaved() {
  yield takeEvery(FETCH_SAVED, removeSaved)
}

export function* removeSaved() {
  yield put({
    type: REMOVE_SAVED_SUCCESS
  })
}
export function* fetchSaved() {
  try {
    let lock = yield select(getCurrentLock)
    if (lock) return
    let anchor = yield select(getCurrentAnchor)
    let limit = yield select(getCurrentLimit)
    let uid = yield select(getOwnerID)

    // console.log('anchor', anchor)
    const saved = yield call(fetchSavedData,
      uid, limit, anchor
    )
    // getLike
    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUsers: listUid
      }),
      put({
        type: FETCH_SAVED_SUCCESSFUL,
        data: saved
      })])
  } catch (error) {
    yield put({
      type: FETCH_SAVED_FALURE,
      error
    })
  }
}

export const savedReducers = (state = cloneDeep(initState), { type, data, error }) => {
  switch (type) {
    case FETCH_SAVED_SUCCESSFUL:
      if (state.locked) return state
      let saved = objectPath.get(data, 'saved', [])
      return {
        ...state,
        saved
      }
    case FETCH_SAVED_FALURE:
      return {
        ...state, error: data
      }
    case REMOVE_SAVED_SUCCESS:
      state = cloneDeep(initState)
    default:
      return state
  }
}

export const fetchFeedAll = () => {
  return {
    type: FETCH_SAVED
  }
}
export const fetchFeedRefreshAll = () => {
  return {
    type: FETCH_SAVED_REFRESH
  }
}

// getter

export const getCurrentAnchor = state => {
  return state.feeds.anchor
}

export const getCurrentTopAnchor = state => {
  return state.feeds.topAnchor
}

export const getAllPosts = state => {
  return state.feeds.posts
}

export const getCurrentLimit = state => {
  return state.feeds.limit
}

export const getCurrentLock = state => {
  return state.feeds.locked
}
