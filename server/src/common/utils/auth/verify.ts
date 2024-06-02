import verifyJwt from "./verify-jwt";
import verifySwssion from "./verify-session";
export default process.env.AUTH_MODE == "jwt" ? verifyJwt : verifySwssion;
