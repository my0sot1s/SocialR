import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import { AsyncStorage } from 'react-native'
import rootReducer from './configureReducers'
import storage from 'redux-persist/es/storage/index.native'
import { persistStore, persistCombineReducers } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './configureSaga'


const config = {
    key: 'telomas',
    storage,
    blacklist: [
        "routing",
        "nav",
    ],
    debug: true
}

const reducer = persistCombineReducers(config, rootReducer)
const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

if (__DEV__) {
    middleware.push(logger)
}
let store = createStore(
    reducer,
    compose(
        applyMiddleware(...middleware)
    )
);

let persistor = persistStore(store)
sagaMiddleware.run(rootSaga);


export { store, persistor };