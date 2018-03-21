import { persistReducer } from 'redux-persist'
import native from 'redux-persist/lib/storage/index.native'
const setConfig = (key) => {
    return {
        key,
        storage: native,
        blacklist: [
            "routing",
            "nav",
        ]
    }
}


export default {
    // nav: NavReducer,
    // newsfeed: persistReducer(setConfig(`newsfeed`), getNewsFeed)
}