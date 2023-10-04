import axios from "axios"

const fetcher = (url) =>axios.get("http://13.54.223.59/webapi"+ url).then((res)=>res.data)

export default fetcher