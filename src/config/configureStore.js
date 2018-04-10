import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import { AsyncStorage } from 'react-native'
import rootReducer from './configureReducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './configureSaga'

export let GetStorageByKey = async (key) => {
  if (!key) return {}
  let ownerInfo = await AsyncStorage.getItem(key)
  try {
    return JSON.parse(ownerInfo)
  } catch (e) {
    return ownerInfo
  }
}

export let SetStorage = async (key, value) => {
  if (!key || !value) return {}
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  await AsyncStorage.setItem(key, value)
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

if (__DEV__) {
  middleware.push(logger)
}
export let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware)
  )
)
sagaMiddleware.run(rootSaga)
