import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import './modules/axios';
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

