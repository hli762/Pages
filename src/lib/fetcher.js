import axios from "axios"
// http://13.54.223.59/webapi
const baseUrl = window.location.href.includes('localhost') ? 'http://13.54.223.59/webapi' : '/webapi';
const fetcher = (url) =>axios.get(baseUrl+ url).then((res)=>res.data)

export {
    baseUrl
}

export default fetcher