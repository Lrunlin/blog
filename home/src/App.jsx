import React, { Suspense, lazy } from "react";
import "./App.scss";
import Head from "./components/Head";
import Foot from "./components/Foot";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Index from "./page/index";
// import Search from "./page/search";
// import Resume from "./page/resume";
// import About from "./page/about";

const Index = lazy(() => import("./page/index"));
const Search = lazy(() => import("./page/search"));
const Resume = lazy(() => import("./page/resume"));
const About = lazy(() => import("./page/about"));

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log(
      "%c网站门户使用React17，node，scss，mysql搭建，Vue3版本移步：https://github.com/Lrunlin/blog/tree/632a14be081fadc51970393995edaf30445b988e",
      "color: red;font-size: 24px;font-weight: bold;text-decoration: underline;"
    );
  }

  return (
    <Router>
      <Head></Head>
      <Suspense fallback={<div>Loading...</div>}>
        <Route path="/" exact component={Index}></Route>
        <Route path="/search" exact component={Search}></Route>
        <Route path="/resume" exact component={Resume}></Route>
        <Route path="/about" exact component={About}></Route>
      </Suspense>
      <Foot></Foot>
    </Router>
  );
}

export default App;
