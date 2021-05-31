import "./index.scss";
import axios from "axios";
const dev = process.env.NODE_ENV !== "production"
axios.defaults.baseURL = dev?"http://localhost:3000/":'https://blog-api.blogweb.cn';
console.log(dev?'开发':'生产');
import Header from "../components/Header";
import Footer from "../components/Footer";

import './antd.css'
function MyApp({ Component, pageProps }) {

  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer/>
    </>
  );
}

export default MyApp;
// https://singsing.io/blog/