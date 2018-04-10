import { GetBlob } from './common'
import qs from 'querystring'

export const fetchComments = async (uid, pid, limit, anchor) => {
  let queryString = qs.stringify({
    limit,
    anchor
  })
  let comments = await GetBlob(`comment/${uid}/post/${pid}?${queryString}`)
  let json = await comments.json()
  return json
}
