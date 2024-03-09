import verifyJwt from "./verify-jwt";
import verifySwssion from "./verify-session";
export default process.env.AUTH == "jwt" ? verifyJwt : verifySwssion;
