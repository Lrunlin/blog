import { useState } from "react";
import Router from "@/router";
import { BrowserRouter, HashRouter } from "react-router-dom";
import useSWR, { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
     <RecoilRoot>
      <HashRouter>
        <SWRConfig value={{ shouldRetryOnError: false }}>
          <Router />
        </SWRConfig>
      </HashRouter>
     </RecoilRoot>
    </>
  );
}

export default App;
