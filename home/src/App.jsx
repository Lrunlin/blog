import React, { Suspense, lazy } from "react";
import "./App.scss";
import Head from "./components/Head";
import Foot from "./components/Foot";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Index = lazy(() => import("./page/index"));
const Search = lazy(() => import("./page/search"));
const Resume = lazy(() => import("./page/resume"));
const About = lazy(() => import("./page/about"));
const ArticleShow = lazy(() => import("./page/ArticleShow"));

function App() {
  if (process.env.NODE_ENV === "production") {
    console.log(
      "%c网站门户使用React17，node，scss，mysql搭建，Vue3版本移步：https://github.com/Lrunlin/blog/tree/632a14be081fadc51970393995edaf30445b988e",
      "color: red;font-size: 24px;font-weight: bold;text-decoration: underline;"
    );
  }

  return (
    <>
      <Router>
        <Head></Head>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" exact component={Index}></Route>
            <Route path="/search" component={Search}></Route>
            <Route path="/resume" component={Resume}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="*" component={ArticleShow}></Route>
          </Switch>
        </Suspense>
        <Foot></Foot>
      </Router>
    </>
  );
}

export default App;
