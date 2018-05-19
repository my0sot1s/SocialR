import {
  call, takeLatest, put,
  select,
  all,
  takeEvery
} from 'redux-saga/effects'
import { getFeedPosts } from '../api/post'
import { LIKE_INFO } from '../store/like'
import { getOwnerID } from './auth'
import { FETCH_MULTIPLE_USER } from '../store/user'
export const FETCH_POST = 'FETCH_POST'
export const FETCH_POST_SUCCESSFUL = 'FETCH_POST_SUCCESSFUL'
export const FETCH_POST_FALURE = 'FETCH_POST_FALURE'
export const FETCH_POST_REFRESH = 'FETCH_POST_REFRESH'
export const FETCH_POST_REFRESH_SUCCESSFUL = 'FETCH_POST_REFRESH_SUCCESSFUL'
export const FETCH_POST_REFRESH_FALURE = 'FETCH_POST_REFRESH_FALURE'
export const REMOVE_ALL_FEED = 'REMOVE_ALL_FEED'
export const REMOVE_ALL_FEED_SUCCESS = 'REMOVE_ALL_FEED_SUCCESS'
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

export function* watchFetchFeeds() {
  yield takeEvery(FETCH_POST, fetchFeeds)
}

export function* watchFetchRefreshFeeds() {
  yield takeLatest(FETCH_POST_REFRESH, fetchRefreshFeeds)
}

export function* watchRemoveFeeds() {
  yield takeEvery(REMOVE_ALL_FEED, removeFeeds)
}

export function* removeFeeds() {
  yield put({
    type: REMOVE_ALL_FEED_SUCCESS
  })
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
        type: FETCH_POST_SUCCESSFUL,
        data: json
      }),
      ...listReqLikeInfo])
  } catch (error) {
    yield put({
      type: FETCH_POST_FALURE,
      error
    })
  }
}

export function* fetchRefreshFeeds() {
  try {
    let topAnchor = yield select(getCurrentTopAnchor)
    let limit = yield select(getCurrentLimit)
    let uid = yield select(getOwnerID)
    let allPost = yield select(getAllPosts)
    // console.log('anchor', anchor)
    const json = yield call(getFeedPosts, {
      uid,
      limit: Math.abs(limit),
      anchor: topAnchor
    })
    listReqLikeInfo.length = 0
    let listUid = json.posts
      .filter(f => !allPost.some(v => v.id === f.id))
      .map(v => {
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
        type: FETCH_POST_REFRESH_SUCCESSFUL,
        data: json
      }),
      ...listReqLikeInfo])
  } catch (error) {
    yield put({
      type: FETCH_POST_REFRESH_FALURE,
      error
    })
  }
}

export const feedReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_POST_SUCCESSFUL:
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
    case FETCH_POST_FALURE:
      return {
        ...state, error: data
      }
    case FETCH_POST_REFRESH_SUCCESSFUL:
      postData = objectPath.get(data, 'posts', [])
      postData = postData.filter(post => {
        if (!state.posts.some(p => p.id === post.id)) return post
      })
      return {
        ...state,
        posts: [...postData, ...state.posts],
        topAnchor: data.anchor
      }
    case FETCH_POST_REFRESH_FALURE:
      return {
        ...state, error: data
      }
    case REMOVE_ALL_FEED_SUCCESS:
      return initState
    default:
      return state
  }
}

export const fetchFeedAll = () => {
  return {
    type: FETCH_POST
  }
}
export const fetchFeedRefreshAll = () => {
  return {
    type: FETCH_POST_REFRESH
  }
}
export const removeAll = () => {
  return {
    type: REMOVE_ALL_FEED
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
