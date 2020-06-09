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
    },
    create: async params => {
        let opt = { ...apiMaps.blog.create };

        const res = await HTTP(opt, params);
        return res;
    },
    update: async params => {
        let opt = { ...apiMaps.blog.update };

        const res = await HTTP(opt, params);
        return res;
    },
    del: async params => {
        let opt = { ...apiMaps.blog.del };

        const res = await HTTP(opt, params);
        return res;
    }
}