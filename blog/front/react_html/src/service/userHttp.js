import user from "../config/apis/user.js";
import HTTP from "./http";
const userHttp = user()
export default {
    login: async params => {
        let opt = { ...userHttp.login };
        // console.log(typeof params);
        const res = await HTTP(opt, params);
        return res;
    }
}