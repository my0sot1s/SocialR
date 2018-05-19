import { GetBlob, PostForm } from './common'
import qs from 'querystring'

export const fetchAlbum = async (uid, limit, anchor) => {
  let queryString = qs.stringify({
    limit,
    anchor
  })
  let album = await GetBlob(`album/${uid}/byAuthor/${uid}?${queryString}`)
  let json = await album.json()
  return json
}

export const createAlbum = async (name, owner, media) => {
  let album = await PostForm(`album/${owner}/create`, [
    { name: 'name', data: name },
    { name: 'owner', data: owner },
    { name: 'media', data: JSON.stringify(media) }
  ])
  let json = await album.json()
  // console.warn(JSON.stringify(json))
  return json
}
