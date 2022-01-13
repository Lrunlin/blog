import { createContext, useReducer, Dispatch, FunctionComponent, useContext } from "react";
import type { userData } from "@/types";

interface storeTypes {
  userData: userData;
  setUserData: Dispatch<userData>;
  assetsPath: string;
}

let storeObj = {};

export const Context = createContext(storeObj as unknown as storeTypes);

const Store: FunctionComponent = props => {
  const reducer = (state: userData, action: userData) => {
    state = action;
    return state;
  };
  const [userData, setUserData] = useReducer(reducer, {
    sign: false,
    email: "",
    GitHub: "",
  });
  let store = {
    userData,
    setUserData,
    assetsPath:
      process.env.NODE_ENV == "development" ? "http://localhost:3456" : "https://assets.blogweb.cn",
    CDN:
      process.env.NODE_ENV == "development" ? "http://localhost:3456" : "https://cdn.blogweb.cn",
  };

  return <Context.Provider value={store}>{props.children}</Context.Provider>;
};

export default Store;
