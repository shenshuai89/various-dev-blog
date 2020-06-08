import apiMaps from "@/config/network/apiMaps.js";
import HTTP from "./http";
export default {
    login: async params => {
        let opt = { ...apiMaps.user.login };
        console.log(typeof params);
        const res = await HTTP(opt, params);
        return res;
    }
}