import {
  GetBlob,
  PostForm
} from './common'

export const fetchUserById = async (id) => {
  let user = await GetBlob(`user/${id}`)
  let json = await user.json()
  return json
}

export const fetchUserByIDs = async (listID) => {
  if (!Array.isArray(listID) || listID.length === 0) return []
  let users = await PostForm(`user/multiples`, [
    { name: 'uIDs', data: JSON.stringify(listID) }
  ])
  let usersInfo = await users.json()
  return usersInfo
}
