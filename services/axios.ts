import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});

export default Axios;
