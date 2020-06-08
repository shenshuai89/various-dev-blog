import apiMaps from "@/config/network/apiMaps.js";
import HTTP from "./http";
export default {
    getLists: async params => {
        let opt = { ...apiMaps.blog.getLists };

        const res = await HTTP(opt, params);
        return res;
    },
    getDetail: async params => {
        let opt = { ...apiMaps.blog.detail };

        const res = await HTTP(opt, params);
        return res;
    }
}