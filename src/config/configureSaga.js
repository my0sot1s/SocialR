import { all, fork } from 'redux-saga/effects'

import { watchFetchFeeds, watchFetchRefreshFeeds } from '../store/post'
import { watchLogin, watchLogout } from '../store/auth'
import { watchFetchUser, watchFetchMultipleUsers } from '../store/user'
import { watchFetchEmotion, watchAddEmotion } from '../store/emotion'
import { watchFetchExplores } from '../store/explore'
import { watchLikeInfo, watchLike } from '../store/like'
import { watchFetchMePosts, watchFetchRefreshMePosts } from '../store/me'
export default function* root() {
  yield all([
    fork(watchFetchFeeds),
    fork(watchFetchRefreshFeeds),
    fork(watchLogin),
    fork(watchLogout),

    fork(watchFetchUser),
    fork(watchFetchMultipleUsers),

    fork(watchFetchEmotion),
    fork(watchAddEmotion),

    fork(watchFetchExplores),
    fork(watchLikeInfo),
    fork(watchLike),
    fork(watchFetchMePosts),
    fork(watchFetchRefreshMePosts)
  ])
}
