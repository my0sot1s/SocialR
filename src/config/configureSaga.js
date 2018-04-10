import { all, fork } from 'redux-saga/effects'

import { watchFetchFeeds, watchClearOldFeeds } from '../store/post'
import { watchLogin, watchLogout } from '../store/auth'
import { watchFetchUser, watchFetchMultipleUsers } from '../store/user'
import { watchFetchEmotion } from '../store/emotion'

export default function * root () {
  yield all([
    fork(watchFetchFeeds),
    fork(watchClearOldFeeds),
    fork(watchLogin),
    fork(watchLogout),

    fork(watchFetchUser),
    fork(watchFetchMultipleUsers),
    fork(watchFetchEmotion)
  ])
}
