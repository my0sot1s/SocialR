import RNFetchBlob from 'react-native-fetch-blob'

export let HOST = 'https://lit-eyrie-97480.herokuapp.com/'
// export let HOST = 'http://local.tenm.cf:4444/'
// const DEV = 'http://local.tenm.cf:4444/'
// const DEV = 'http://192.168.22.103:4444/'
// HOST = DEV
/**
 *
 * @param {String} url
 * @param {Object} options
 */
export const GetBlob = async (url, options = {}) => {
  let data = await RNFetchBlob.fetch('GET', `${HOST}${url}`, {
    ...options,
    Accept: 'application/json'
  })
  return data
}
/**
 *
 * @param {String} url
 * @param {array} body
 */
export const PostForm = async (url, body = []) => {
  let data = await RNFetchBlob
    .fetch('POST', `${HOST}${url}`, {
      Accept: 'application/json'
    }, body)
  return data
}

export const UploadForm = async (url, body) => {
  // change data uri
  body[0].data = RNFetchBlob.wrap(body[0].data)
  let data = await RNFetchBlob.fetch('POST', url, {
    'Content-Type': 'multipart/form-data'
  }, body)
  return data
}
