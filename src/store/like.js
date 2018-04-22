import {
  call,
  takeLatest,
  takeEvery,
  put,
  select
} from 'redux-saga/effects'
// import { fetchUserById, fetchUserByIDs } from '../api/user'
import * as like from '../api/like'
export const FETCH_COUNT_LIKE = 'FETCH_COUNT_LIKE'
export const FETCH_COUNT_LIKE_SUCCESS = 'FETCH_COUNT_LIKE_SUCCESS'
export const FETCH_COUNT_LIKE_FALURE = 'FETCH_COUNT_LIKE_FALURE'
export const IS_LIKE = 'IS_LIKE'
export const IS_LIKE_SUCCESS = 'IS_LIKE'
export const LIKE_INFO = 'LIKE_INFO'
export const LIKE_INFO_SUCCESS = 'LIKE_INFO_SUCCESS'
export const HIT_LIKE = 'HIT_LIKE'
export const HIT_LIKE_SUCCESS = 'HIT_LIKE_SUCCESS'
export const HIT_LIKE_FAILURE = 'HIT_LIKE_FAILURE'
export const UN_LIKE = 'UN_LIKE'
export const UN_LIKE_SUCCESS = 'UN_LIKE_SUCCESS'
export const UN_LIKE_FAILURE = 'UN_LIKE_FAILURE'
const objectPath = require('object-path')

const initState = {
  likeList: [], // luu post ban da like
  listCountLike: {}, // list coundlike ex:{'5a1060c1cb8eae85d819a78c':32}
  error: null
}

export function* watchCountLike() {
  yield takeLatest(FETCH_COUNT_LIKE, startFetchCountLike)
}
export function* watchIsLike() {
  yield takeLatest(FETCH_IS_LIKE, startCheckLikeCount)
}
export function* watchLikeInfo() {
  yield takeEvery(LIKE_INFO, startGetInfo)
}
export function* watchLike() {
  yield takeLatest(HIT_LIKE, startLike)
}
export function* watchUnlike() {
  yield takeLatest(UN_LIKE, startUnlike)
}
export function* startGetInfo({ uid, pid }) {
  const [count, ownerLike] = yield call(like.getInfoLike, uid, pid)
  console.log({ count, ownerLike, pid })
  yield put({ type: LIKE_INFO_SUCCESS, data: { count, ownerLike, pid } })
}

export function* startFetchCountLike({ uid, pid }) {
  try {
    const json = yield call(like.checkOwnLike, uid, pid)
    yield put({ type: FETCH_COUNT_LIKE_SUCCESS, data: { num: json, pid } })
  } catch (error) {
    yield put({ type: FETCH_COUNT_LIKE_FALURE, error })
  }
}

export function* startCheckLikeCount({ uid, pid }) {
  try {
    const json = yield call(like.fetchCountLike, uid, pid)
    yield put({ type: IS_LIKE_SUCCESS, data: json })
  } catch (error) {
  }
}

export function* startLike({ uid, pid }) {
  try {
    const json = yield call(like.hitLikePost, uid, pid)
    yield put({ type: HIT_LIKE_SUCCESS, data: { ...json, uid, pid } })
  } catch (error) {
    yield put({ type: HIT_LIKE_FAILURE, error })
  }
}

export function* startUnlike({ uid, pid }) {
  try {
    const json = yield call(like.unlikePost, uid, pid)
    yield put({ type: UN_LIKE_SUCCESS, data: json })
  } catch (error) {
    yield put({ type: UN_LIKE_FAILURE, error })
  }
}

export const usersLikeReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_COUNT_LIKE_SUCCESS:
      if (!data || !data.pid || !data.num) return
      state.listCountLike[data.pid] = data.num
      return state
    case FETCH_COUNT_LIKE_FALURE:
      return {
        ...state, error: data
      }
    case IS_LIKE_SUCCESS:
      return {
        ...state,
        likeList: [...state.likeList, data]
      }

    case LIKE_INFO_SUCCESS:
      state.listCountLike[data.pid] = data.count
      return {
        ...state,
        likeList: [...state.likeList, data.ownerLike]
      }
    case HIT_LIKE_SUCCESS:
      state[data.like] = state[data.like]++
      let templist = {
        pid: data.pid,
        status: true,
        uid: data.uid
      }
      return {
        ...state,
        listCountLike: {},
        likeList: [...state.likeList, templist]
      }
    case HIT_LIKE_FAILURE:
      return {
        ...state,
        likeList: [...state.likeList, data]
      }
    default:
      return state
  }
}

// actions

export const fetchCountLike = (uid, pid) => {
  return {
    type: FETCH_COUNT_LIKE,
    uid,
    pid
  }
}
export const checkLiked = (uid, pid) => {
  return {
    type: IS_LIKE,
    uid,
    pid
  }
}

export const checkLikedInfo = (uid, pid) => {
  return {
    type: LIKE_INFO,
    uid,
    pid
  }
}
export const hitLikeNow = (uid, pid) => {
  return {
    type: HIT_LIKE,
    uid,
    pid
  }
}
// getter
export const isLikePost = (state, pid) => {
  if (!Array.isArray(state.like.likeList)) return
  return state.like.likeList.find(l => l.pid === pid)
}

export const countLike = (state, pid) => {
  if (!state.like.listCountLike) return
  return state.like.listCountLike[pid]
}
