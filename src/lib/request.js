import axios from "axios";

const baseUrl = window.location.href.includes('localhost') ? 'http://13.54.223.59/webapi' : '/webapi';
const request = axios.create({
  baseURL: baseUrl,
});

export default request;





