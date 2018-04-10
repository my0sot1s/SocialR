import { combineReducers } from 'redux'
import { feedReducers } from '../store/post'
import { authReducers } from '../store/auth'
import { usersReducers } from '../store/user'
import { usersEmotionReducers } from '../store/emotion'

export default combineReducers({
  feeds: feedReducers,
  auth: authReducers,
  user: usersReducers,
  emotion: usersEmotionReducers
})
