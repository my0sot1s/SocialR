import {
  call,
  takeLatest,
  put,
  all,
  select
} from 'redux-saga/effects'
// import { fetchUserById, fetchUserByIDs } from '../api/user'
import { FETCH_MULTIPLE_USER } from './user'
import { fetchEmotions } from '../api/emotion'
export const FETCH_EMOTION = 'FETCH_EMOTION'
export const FETCH_EMOTION_SUCCESS = 'FETCH_EMOTION_SUCCESS'
export const FETCH_EMOTION_FALURE = 'FETCH_EMOTION_FALURE'

const objectPath = require('object-path')
const uniq = require('lodash/uniq')

const initState = {
  emotions: {},
  error: null
}

export function* watchFetchEmotion() {
  yield takeLatest(FETCH_EMOTION, startFetchEmotions)
}

export function* startFetchEmotions({ uid }) {
  try {
    // let checkuser = yield select(findUser(uid))
    // if (checkuser) return
    const json = yield call(fetchEmotions, uid)
    let listUid = Object.keys(json)
    let listUser = uniq(listUid)
    yield all([
      put({
        type: FETCH_MULTIPLE_USER,
        listUser
      }),
      put({ type: FETCH_EMOTION_SUCCESS, data: json })
    ])
  } catch (error) {
    yield put({ type: FETCH_EMOTION_FALURE, error })
  }
}

export const usersEmotionReducers = (state = initState, { type, data, error }) => {
  switch (type) {
    case FETCH_EMOTION_SUCCESS:
      return {
        ...state,
        emotions: {...state.emotions, ...data.emotions}
      }
    case FETCH_EMOTION_FALURE:
      return {
        ...state, error: data
      }
    default:
      return state
  }
}

// actions

export const fetchUserEmotion = (uid) => {
  return {
    type: FETCH_EMOTION,
    uid
  }
}

// getter

export const getUsersEmotion = state => {
  return state.emotion.emotions
}
export const getUsersEmotionUserId = state => {
  return Object.keys(state.emotion.emotions)
}
