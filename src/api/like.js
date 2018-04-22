import {
  GetBlob,
  PostForm
} from './common'

export const fetchCountLike = async (uid, pid) => {
  let raw = await GetBlob(`like/${uid}/count/${pid}`)
  let count = await raw.text()
  return count
}

export const checkOwnLike = async (uid, pid) => {
  let raw = await PostForm(`like/${uid}/owner/${pid}`, [
    { name: 'uid', data: uid }
  ])
  let json = await raw.json()
  return json
}

export const getInfoLike = async (uid, pid) => Promise.all(
  [fetchCountLike(uid, pid),
  checkOwnLike(uid, pid)])

export const hitLikePost = async (uid, pid) => {
  let raw = await PostForm(`like/${uid}/like/${pid}`, [
    { name: 'uid', data: uid }
  ])
  let json = await raw.json()
  return json
}

export const unlikePost = async (uid, pid) => {
  let raw = await PostForm(`like/${uid}/unlike/${pid}`, [
    { name: 'uid', data: uid }
  ])
  let json = await raw.json()
  return json
}
