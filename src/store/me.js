import {
  call, takeLatest, put,
  select,
  all,
  takeEvery
} from 'redux-saga/effects'
import { getOwnerID } from './auth'
import { getMePosts } from '../api/post'
import { FETCH_MULTIPLE_USER } from '../store/user'
import { LIKE_INFO } from '../store/like'

export const FETCH_ME_POST = 'FETCH_ME_POST'
export const FETCH_ME_POST_SUCCESSFUL = 'FETCH_ME_POST_SUCCESSFUL'
export const FETCH_ME_POST_FALURE = 'FETCH_ME_POST_FALURE'
export const FETCH_ME_POST_REFRESH = 'FETCH_ME_POST_REFRESH'
export const FETCH_ME_POST_REFRESH_SUCCESSFUL = 'FETCH_ME_POST_REFRESH_SUCCESSFUL'
export const FETCH_ME_POST_REFRESH_FALURE = 'FETCH_ME_POST_REFRESH_FALURE'
export const REMOVE_ALL = 'REMOVE_ALL'
export const REMOVE_ALL_SUCCESS = 'REMOVE_ALL_SUCCESS'

const objectPath = require('object-path')
let listReqLikeInfo = []
const initState = {
  limit: -3,
  posts: [],
  anchor: '',
  topAnchor: '',
  // postFetching: false,
  error: null,
  locked: false
}

export function* watchFetchMePosts() {
  yield takeLatest(FETCH_ME_POST, fetchMePosts)
}
export function* watchRemoveALl() {
  yield takeEvery(REMOVE_ALL, removeAllData)
}

export function* watchFetchRefreshMePosts() {
  yield takeLatest(FETCH_ME_POST_REFRESH, fetchRefreshMePosts)
}

export function* removeAllData() {
  yield put({
    type: REMOVE_ALL_SUCCESS
  })
}

export function* fetchMePosts({ uid }) {
  try {
    let lock = yield select(getMeCurrentLock)
    if (lock) return
    let anchor = yield select(getMeCurrentAnchor)
    let limit = yield select(getMeCurrentLimit)
    // let uid = yield select(getOwnerID)

    // console.log('anchor', anchor)
    const json = yield call(getMePosts, {
      owner: uid, limit, anchor
    })
    listReqLikeInfo.length = 0
    let listUid = json.posts.map(v => {
      listReqLikeInfo.push(put({
        type: LIKE_INFO,
        uid: uid,
        pid: v.id
      }))
      return v.user_id
    })
    // getLike

    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUsers: listUid
      }),
      put({
        type: FETCH_ME_POST_SUCCESSFUL,
        data: json
      }),
      ...listReqLikeInfo])
  } catch (error) {
    yield put({
      type: FETCH_ME_POST_FALURE,
      error
    })
  }
}

export function* fetchRefreshMePosts(uid) {
  try {
    let topAnchor = yield select(getMeCurrentTopAnchor)
    let limit = yield select(getMeCurrentLimit)
    // let uid = yield select(getOwnerID)

    // console.log('anchor', anchor)
    const json = yield call(getMePosts, {
      uid,
      limit: Math.abs(limit),
      anchor: topAnchor
    })
    listReqLikeInfo.length = 0
    let listUid = json.posts.map(v => {
      listReqLikeInfo.push(put({
        type: LIKE_INFO,
        uid: uid,
        pid: v.id
      }))
      return v.user_id
    })
    if (listUid.length === 0) return
    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUsers: listUid
      }),
      put({
        type: FETCH_ME_POST_REFRESH_SUCCESSFUL,
        data: json
      }),
      ...listReqLikeInfo])
  } catch (error) {
    yield put({
      type: FETCH_ME_POST_REFRESH_FALURE,
      error
    })
  }
}

export const meReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_ME_POST_SUCCESSFUL:
      if (state.locked) return state
      let postData = objectPath.get(data, 'posts', [])
      postData = postData.filter(post => {
        if (!state.posts.some(p => p.id === post.id)) return post
      })
      let redux = {
        ...state,
        posts: [...state.posts, ...postData],
        anchor: data.anchor,
        locked: objectPath.get(data, 'posts', []).length < Math.abs(state.limit)
      }
      if (!state.anchor && !state.locked) {
        redux.topAnchor = data.anchor
      }
      return redux
    case FETCH_ME_POST_FALURE:
      return {
        ...state, error: data
      }
    case FETCH_ME_POST_REFRESH_SUCCESSFUL:
      postData = objectPath.get(data, 'posts', [])
      postData = postData.filter(post => {
        if (!state.posts.some(p => p.id === post.id)) return post
      })
      return {
        ...state,
        posts: [...postData, ...state.posts],
        topAnchor: data.anchor
      }
    case FETCH_ME_POST_REFRESH_FALURE:
      return {
        ...state, error: data
      }
    case REMOVE_ALL_SUCCESS:
      return initState
    default:
      return state
  }
}

export const fetchMePostsAll = (uid) => {
  return {
    type: FETCH_ME_POST, uid
  }
}
export const fetchRefreshMePostsAll = (uid) => {
  return {
    type: FETCH_ME_POST_REFRESH, uid
  }
}
export const removeAll = () => {
  return {
    type: REMOVE_ALL
  }
}

// getter

export const getMeCurrentAnchor = state => {
  return state.me.anchor
}

export const getMeCurrentTopAnchor = state => {
  return state.me.topAnchor
}

export const getMeAllPosts = state => {
  return state.me.posts
}

export const getMeCurrentLimit = state => {
  return state.me.limit
}

export const getMeCurrentLock = state => {
  return state.me.locked
}
