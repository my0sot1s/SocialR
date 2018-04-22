import { GetBlob, PostForm } from './common'
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

export const fetch2Comments = async (uid, pid) => {
  console.log({ uid, pid })
  let queryString = qs.stringify({
    limit: -2,
    anchor: ''
  })
  let comments = await GetBlob(`comment/${uid}/post/${pid}?${queryString}`)
  console.log({ comments })
  let json = await comments.json()
  return json
}

export const postCommentPost = async (uid, pid, text) => {
  let comments = await PostForm(`comment/${uid}/post/${pid}`, [
    { name: 'uid', data: uid },
    { name: 'text', data: text }
  ])
  let json = await comments.json()
  return json
}
