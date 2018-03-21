import RNFetchBlob from 'react-native-fetch-blob'
/**
 *
 * @param {String} url
 * @param {Object} options
 */
export const GetBlob = async (url, options = {}) => {
    let data = await RNFetchBlob
        .fetch('GET', url, {
            ...options,
            Accept: 'application/json',
        })
    return data
}
/**
 *
 * @param {String} url
 * @param {String} type
 * @param {Object} options
 * @param {string} body
 */
export const PostForm = async (url, type, options = {}, body) => {
    if (!body && typeof options === 'string') { body = options; options = Object.assign({}); }
    let data = await RNFetchBlob
        .fetch(type, url, {
            ...options,
            Accept: 'application/json',
        }, { ...body })
    return data
}