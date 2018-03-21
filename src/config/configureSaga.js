import { all, fork, takeLatest } from 'redux-saga/effects'

export default function* root() {
    yield all([
        // fork(getNewsFeeds),
    ])
}