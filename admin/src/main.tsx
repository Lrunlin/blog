import ReactDOM from "react-dom/client";
import App from "./App";
import "antd/dist/antd.css";
import "@/style/globals.scss";
import "@/plugin/axios";


import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
