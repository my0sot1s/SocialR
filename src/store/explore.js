import {
  call, takeEvery, put,
  select,
  all
} from 'redux-saga/effects'
import { getExplores } from '../api/post'
import { getOwnerID } from './auth'
import { FETCH_MULTIPLE_USER } from '../store/user'
export const FETCH_EXPLORES = 'FETCH_EXPLORES'
export const FETCH_EXPLORES_SUCCESSFUL = 'FETCH_EXPLORES_SUCCESSFUL'
export const FETCH_EXPLORES_FALURE = 'FETCH_EXPLORES_FALURE'
export const REMOVE_EXPLORER = 'REMOVE_EXPLORER'
export const REMOVE_EXPLORER_SUCCESS = 'REMOVE_EXPLORER_SUCCESS'

const objectPath = require('object-path')
const initState = {
  limit: -5,
  explores: [],
  anchor: '',
  // postFetching: false,
  error: null,
  locked: false
}

export function* watchFetchExplores() {
  yield takeEvery(FETCH_EXPLORES, fetchExplores)
}
export function* watchRemoveExplorers() {
  yield takeEvery(REMOVE_EXPLORER, removeEx)
}

export function* removeEx() {
  yield put({
    type: REMOVE_EXPLORER_SUCCESS
  })
}
export function* fetchExplores() {
  try {
    let lock = yield select(getCurrentExploresLock)
    if (lock) return
    let anchor = yield select(getCurrentExploreAnchor)
    let limit = yield select(getCurrentExploresLimit)
    let uid = yield select(getOwnerID)
    // console.log('anchor', anchor)
    const json = yield call(getExplores, {
      owner: uid, limit, anchor
    })

    let listUid = json.explores.map(v => {
      return v.user_id
    })

    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUsers: listUid
      }),
      put({
        type: FETCH_EXPLORES_SUCCESSFUL,
        data: json
      })])
  } catch (error) {
    yield put({
      type: FETCH_EXPLORES_FALURE,
      error
    })
  }
}

export const exploreReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_EXPLORES_SUCCESSFUL:
      if (state.locked) return state
      return {
        ...state,
        explores: [...state.explores, ...objectPath.get(data, 'explores', [])],
        anchor: data.anchor,
        locked: objectPath.get(data, 'explores', []).length < Math.abs(state.limit)
      }
    case FETCH_EXPLORES_FALURE:
      return {
        ...state, error: data
      }
    case REMOVE_EXPLORER_SUCCESS:
      return initState
    default:
      return state
  }
}

export const fetchExploreAll = () => {
  return {
    type: FETCH_EXPLORES
  }
}

// getter

export const getCurrentExploreAnchor = state => {
  return state.explores.anchor
}

export const getAllExplores = state => {
  return state.explores.explores
}

export const getCurrentExploresLimit = state => {
  return state.explores.limit
}

export const getCurrentExploresLock = state => {
  return state.explores.locked
}

export const findPost = (state, pid) => {
  return state.explores.explores.find(ex => ex.id === pid)
}
