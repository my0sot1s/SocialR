import { combineReducers } from 'redux'
import { feedReducers } from '../store/post'
import { authReducers } from '../store/auth'
import { usersReducers } from '../store/user'
import { usersEmotionReducers } from '../store/emotion'
import { exploreReducers } from '../store/explore'
import { usersLikeReducers } from '../store/like'
import { meReducers } from '../store/me'

export default combineReducers({
  feeds: feedReducers,
  auth: authReducers,
  user: usersReducers,
  emotion: usersEmotionReducers,
  explores: exploreReducers,
  like: usersLikeReducers,
  me: meReducers
})
