import blog from "../config/apis/blog.js";
import HTTP from "./http";
const blogHttp = blog()
export default {
    getLists: async params => {
        let opt = { ...blogHttp.getLists };
        const res = await HTTP(opt, params);
        return res;
    },
    getDetail: async params => {
        let opt = { ...blogHttp.detail };

        const res = await HTTP(opt, params);
        return res;
    },
    create: async params => {
        let opt = { ...blogHttp.create };

        const res = await HTTP(opt, params);
        return res;
    },
    update: async params => {
        let opt = { ...blogHttp.update };

        const res = await HTTP(opt, params);
        return res;
    },
    del: async params => {
        let opt = { ...blogHttp.del };

        const res = await HTTP(opt, params);
        return res;
    }
}