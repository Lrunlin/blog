import signJwt from "./sign-jwt";
import signSwssion from "./sign-session";

export default process.env.AUTH == "jwt" ? signJwt : signSwssion;
