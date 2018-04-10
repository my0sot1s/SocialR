import {
  call, takeLatest, put,
  select,
  all
} from 'redux-saga/effects'
import { getFeedPosts } from '../api/post'
import { getOwnerID } from './auth'
import { FETCH_MULTIPLE_USER } from '../store/user'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SUCCESSFUL = 'FETCH_POST_SUCCESSFUL'
export const FETCH_POST_FALURE = 'FETCH_POST_FALURE'
export const CLEAR_AND_REFRESH = 'CLEAR_AND_REFRESH'
export const DO_CLEAR_AND_REFRESH = 'DO_CLEAR_AND_REFRESH'
const uniq = require('lodash/uniq')
const objectPath = require('object-path')
const initState = {
  limit: 3,
  posts: [],
  anchor: '',
  // postFetching: false,
  error: null,
  locked: false
}

export function* watchFetchFeeds() {
  yield takeLatest(FETCH_POST, fetchFeeds)
}

export function* watchClearOldFeeds() {
  yield takeLatest(CLEAR_AND_REFRESH, clearOldFeeds)
}

export function* clearOldFeeds() {
  put({ type: DO_CLEAR_AND_REFRESH })
}

export function* fetchFeeds() {
  try {
    let lock = yield select(getCurrentLock)
    if (lock) return
    let anchor = yield select(getCurrentAnchor)
    let limit = yield select(getCurrentLimit)
    let uid = yield select(getOwnerID)

    // console.log('anchor', anchor)
    const json = yield call(getFeedPosts, {
      uid, limit, anchor
    })
    let listUid = json.posts.map(v => {
      return v.user_id
    })
    let listUsers = uniq(listUid)
    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUsers
      }),
      put({
        type: FETCH_POST_SUCCESSFUL,
        data: json
      })])
  } catch (error) {
    yield put({
      type: FETCH_POST_FALURE,
      error
    })
  }
}

export const feedReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_POST_SUCCESSFUL:
      if (state.locked) return state
      return {
        ...state,
        posts: [...state.posts, ...objectPath.get(data, 'posts', [])],
        anchor: data.anchor,
        locked: data.posts.length < state.limit
      }
    case FETCH_POST_FALURE:
      return {
        ...state, error: data
      }
    case DO_CLEAR_AND_REFRESH:
      return {
        ...state,
        ...initState
      }
    default:
      return state
  }
}

export const fetchFeedAll = () => {
  return {
    type: FETCH_POST
  }
}

export const clearAllOldFeedFromStore = () => {
  return {
    type: CLEAR_AND_REFRESH
  }
}

// getter

export const getCurrentAnchor = state => {
  return state.feeds.anchor
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
