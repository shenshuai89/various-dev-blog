import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    method: 'post',
    baseURL: process.env.API_ROOT,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {},
    timeout: 4000,
    responseType: 'json'
});
const requestMap = new Map();
const CancelToken = axios.CancelToken

const errorHandle = (status, data, config) => {
    const statusHandle = status => {
        return (status = JSON.stringify(status).match(new RegExp("^5.*$"))
            ? JSON.stringify(status).match(new RegExp("^504.*$"))
                ? '504'
                : "5xx"
            : status);
    };
    requestMap.delete(config._keyString);
    // 状态码判断
    const errorHandleMap = {
        404: () => {
            console.log("请求的地址不存在");
        },
        504: () => {
            console.log("请求超时，请稍后再试哦~");
        },
        "5xx": () => {
            setTimeout(() => {
                console.error("服务器错误");
            }, 1000);
        }
    };
    return errorHandleMap[statusHandle(status)]();
};

instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
instance.interceptors.request.use(
    async config => {
        // 防重复提交
        const keyString = qs.stringify(
            Object.assign({}, {
                url: config.url,
                method: config.method
            }, config.data)
        );
        // 当前已经提交了
        if (requestMap.get(keyString)) {
            // 取消当前请求
            config.cancelToken = new CancelToken(() => {
                console.log("已经提交，请耐心等待～");
            });
        }
        requestMap.set(keyString, true);
        Object.assign(config, {
            _keyString: keyString
        });
        if (
            config.method.toLocaleLowerCase() === "post" ||
            config.method.toLocaleLowerCase() === "put" ||
            config.method.toLocaleLowerCase() === "delete"
        ) {
            
            let pData = (config.params && config.params.pData) ? config.params.pData : null
            if (pData) {
                // get请求，params存在
                let { pData, ...rest } = config.params
                config.data = pData
                config.params = rest;
            } else {
                // 除get以外的请求
                config.data = config.params;
                config.params = null
            }
        } 
        return config;
    },
    error => Promise.error(error)
);

// response 拦截器
instance.interceptors.response.use(
    response => {
        // 重置requestMap
        const config = response.config;
        requestMap.set(config._keyString, false);

        let data;
        if (response.data === undefined) {
            data = response.request.responseText;
        } else {
            data = response.data;
        }

        return JSON.parse(JSON.stringify(data));
    },
    error => {

        if (error.message.includes('timeout')) {
            return {
                status: 504,
                data: '请求超时，请稍后再试哦~'
            }
        }
        const { response } = error;
        if (response) {
            const config = response.config;

            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data, config);
        }
        return Promise.reject(error);
    }
);

export default instance;