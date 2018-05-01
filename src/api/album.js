import { GetBlob } from './common'
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
