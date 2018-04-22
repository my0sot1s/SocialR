import { GetBlob, PostForm } from './common'

export const fetchEmotions = async (uid) => {
  let emotions = await GetBlob(`emotion/${uid}`)
  let json = await emotions.json()
  return json
}

export const addEmotion = async (uid, media) => {
  if (typeof media === 'object') media = JSON.stringify(media)
  let emotions = await PostForm(`emotion/${uid}/create`, [
    { name: 'by', data: uid },
    { name: 'medias', data: media }
  ])
  let json = emotions.json()
  return json
}
