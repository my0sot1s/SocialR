import {
  PostForm,
  GetBlob
} from './common'
import qs from 'querystring'

export let postDemo = async () => {
  let form = await PostForm(`postDemo/abc`, [
    { name: 'postForm', data: 'postForm' }
  ])
  return form.json()
}

export let sendCreatePost = async ({ tags, medias, uid, content }) => {
  let form = await PostForm(`post/${uid}/create`, [
    { name: 'tags', data: JSON.stringify(tags) },
    { name: 'medias', data: JSON.stringify(medias) },
    { name: 'content', data: content },
    { name: 'user_id', data: uid }
  ])
  return form
}

export let getFeedPosts = async ({ uid, limit, anchor }) => {
  let query = qs.stringify({
    limit,
    anchor
  })
  let blob = await GetBlob(`feed/${uid}/feedPost/${uid}?${query}`)
  let json = await blob.json()
  return json
}

export const getExplores = async ({ owner, limit, anchor }) => {
  let query = qs.stringify({
    limit,
    anchor
  })
  let explores = await GetBlob(`explore/${owner}?${query}`)
  let json = await explores.json()
  return json
}

export const getMePosts = async ({ owner, limit, anchor }) => {
  let query = qs.stringify({
    limit,
    anchor
  })
  let mePosts = await GetBlob(`post/${owner}?${query}`)
  let json = await mePosts.json()
  return json
}
