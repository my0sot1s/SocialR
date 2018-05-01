import {
  GetBlob
} from './common'

export const fetchCountFollow = async (uid, owner) => {
  let raw = await GetBlob(`follow/${uid}/count/${owner}`)
  let count = await raw.text()
  return count
}
