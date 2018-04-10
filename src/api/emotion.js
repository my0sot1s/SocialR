import { GetBlob } from './common'

export const fetchEmotions = async (uid) => {
  let emotions = await GetBlob(`emotion/${uid}`)
  let json = await emotions.json()
  return json
}
