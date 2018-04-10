import {
  UploadForm,
  GetBlob
} from './common'
const API_KEY = '185362918485478'

const CLOUD = 'telosma'
let UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`

let UploadImage = async (signature, uri, name = 'upload.png', type = 'image/jpeg') => {
  let timestamp = (Date.now() / 1000 | 0).toString()
  let formData = [
    { name: 'file', filename: name, data: uri, type },
    { name: 'timestamp', data: timestamp },
    { name: 'api_key', data: API_KEY },
    { name: 'signature', data: signature }
  ]
  let dataRaw = await UploadForm(UPLOAD_URL, formData)

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
    return UploadImage(signatureKeys[index].signature, img.uri, img.filename)
  })
  let totalResult = await Promise.all(queueRequest)
  return totalResult
}

export default uploadImageFiles
