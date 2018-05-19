import { all, fork } from 'redux-saga/effects'

import { watchFetchFeeds, watchFetchRefreshFeeds, watchRemoveFeeds } from '../store/post'
import { watchLogin, watchLogout } from '../store/auth'
import { watchFetchUser, watchFetchMultipleUsers, watchRemoveUsers, watchSearchUsers } from '../store/user'
import { watchFetchEmotion, watchAddEmotion, watchRemoveEmo } from '../store/emotion'
import { watchFetchExplores, watchRemoveExplorers } from '../store/explore'
import { watchLikeInfo, watchLike, watchRemoveLike } from '../store/like'
import { watchFetchMePosts, watchFetchRefreshMePosts, watchRemoveALl } from '../store/me'
export default function* root() {
  yield all([
    fork(watchFetchFeeds),
    fork(watchFetchRefreshFeeds),
    fork(watchRemoveFeeds),
    fork(watchLogin),
    fork(watchLogout),

    fork(watchFetchUser),
    fork(watchFetchMultipleUsers),
    fork(watchRemoveUsers),
    fork(watchSearchUsers),

    fork(watchFetchEmotion),
    fork(watchAddEmotion),
    fork(watchRemoveEmo),

    fork(watchFetchExplores),
    fork(watchRemoveExplorers),
    fork(watchLikeInfo),
    fork(watchLike),
    fork(watchRemoveLike),
    fork(watchFetchMePosts),
    fork(watchRemoveALl),
    fork(watchFetchRefreshMePosts)
  ])
}
