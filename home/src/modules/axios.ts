import axios from 'axios';
import md5 from 'md5';
import {
    encode
} from 'js-base64';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV === "production" ?
    'https://blog-api.blogweb.cn' :
    "http://localhost:3000/";