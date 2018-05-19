
import { GetBlob } from './common'
import qs from 'querystring'

export const fetchSavedData = async (saver, limit, anchor) => {
  let queryString = qs.stringify({
    limit,
    anchor
  })
  let album = await GetBlob(`saved/${saver}?${queryString}`)
  let json = await album.json()
  return json
}
