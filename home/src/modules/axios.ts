import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = process.env.NODE_ENV === "production" ?
//     'https://blog-api.blogweb.cn' :
//     "http://localhost:3000/";


axios.defaults.baseURL = `http://localhost:3000/`;
