import {
  GetBlob,
  PostForm
} from './common'

export const fetchCountFollow = async (uid, owner) => {
  let raw = await GetBlob(`follow/${uid}/count/${owner}`)
  let count = await raw.text()
  return count
}
export const isFollow = async (owner, target) => {
  let raw = await GetBlob(`follow/${owner}/is/${target}`)
  let isFollowing = await raw.json()
  return isFollowing
}
export const followPeople = async (owner, userTarget) => {
  let raw = await PostForm(`follow/${owner}/follow`, [{
    name: 'owner', data: userTarget
  }])
  let follow = await raw.json()
  return follow
}
export const unfollowFriend = async (owner, userTarget) => {
  let raw = await PostForm(`follow/${owner}/unfollow`, [{
    name: 'owner', data: userTarget
  }])
  let follow = await raw.json()
  return follow
}
