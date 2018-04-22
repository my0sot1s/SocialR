import { all, fork } from 'redux-saga/effects'

import { watchFetchFeeds, watchFetchRefreshFeeds } from '../store/post'
import { watchLogin, watchLogout } from '../store/auth'
import { watchFetchUser, watchFetchMultipleUsers } from '../store/user'
import { watchFetchEmotion } from '../store/emotion'
import { watchFetchExplores } from '../store/explore'
import { watchLikeInfo } from '../store/like'
export default function* root() {
  yield all([
    fork(watchFetchFeeds),
    fork(watchFetchRefreshFeeds),
    fork(watchLogin),
    fork(watchLogout),

    fork(watchFetchUser),
    fork(watchFetchMultipleUsers),
    fork(watchFetchEmotion),
    fork(watchFetchExplores),
    fork(watchLikeInfo)
  ])
}
