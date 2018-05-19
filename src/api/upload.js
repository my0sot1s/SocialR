import {
  UploadForm,
  GetBlob
} from './common'
const API_KEY = '185362918485478'

const CLOUD = 'telosma'
let UPLOAD_IMAGE_URL = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`
let UPLOAD_VIDEO_URL = `https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`

let UploadImage = async (signature, timestamp, uri, name = 'upload.png', type = 'image/jpeg') => {
  let formData = [
    { name: 'file', filename: name, data: uri, type },
    { name: 'timestamp', data: timestamp },
    { name: 'api_key', data: API_KEY },
    { name: 'signature', data: signature }
  ]
  let dataRaw
  if (type === 'image/jpeg') dataRaw = await UploadForm(UPLOAD_IMAGE_URL, formData)
  else if (type === 'video/mp4') dataRaw = await UploadForm(UPLOAD_VIDEO_URL, formData)
  else return {}
  let jsonData = await dataRaw.json()
  return {
    public_id: jsonData.public_id,
    width: jsonData.width,
    height: jsonData.height,
    format: jsonData.format,
    bytes: jsonData.bytes,
    url: jsonData.url
  }
}

export const getSignature = async () => {
  let raw = await GetBlob(`signature-file`)
  let key = await raw.json()
  return key
}

export const signatureFiles = async (count = 0) => {
  let queueRequestGetKeys = []
  for (let i = 0; i < count; i++) {
    queueRequestGetKeys.push(getSignature())
  }
  let keys = await Promise.all(queueRequestGetKeys)
  return keys
}

export const uploadImageFiles = async (imgs = []) => {
  let signatureKeys = await signatureFiles(imgs.length)
  let queueRequest = imgs.map((img, index) => {
    return UploadImage(signatureKeys[index].signature,
      signatureKeys[index].timestamp,
      img.uri,
      img.filename)
  })
  let totalResult = await Promise.all(queueRequest)
  return totalResult
}

export const uploadSingleImage = async (img = {}) => {
  let sig = await getSignature()
  let imageInfo = await UploadImage(sig.signature,
    sig.timestamp,
    img.uri,
    img.filename)
  return imageInfo
}

export const uploadSingleVideo = async (video = {}) => {
  let sig = await getSignature()
  let videoInfo = await UploadImage(sig.signature,
    sig.timestamp,
    video.uri,
    `video:${new Date().getTime()}`,
    'video/mp4')
  return videoInfo
}

export default uploadImageFiles
