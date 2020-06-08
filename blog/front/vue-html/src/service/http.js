import axios from "@/config/http/axios";
const HTTP = async (option, params = null) => {
    try {
        let res = await axios({
            ...option,
            params,
            data: params
        });

        return res;
    } catch (e) {
        console.error(e);
    }
};


export default HTTP;