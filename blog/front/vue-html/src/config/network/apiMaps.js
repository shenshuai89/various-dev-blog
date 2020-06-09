import apis from "./apis/index";

const $api_root = process.env.ROOTAPI;
// console.log("不同环境下TYPE对象TYPE", process.env.TYPE);
// console.log("不同环境下TYPE对象ROOTAPI", process.env.ROOTAPI);

let apiMapsKey = Object.keys(apis)
let apiMaps = {}

apiMapsKey.forEach( fileName => {
    apiMaps[fileName] = apis[fileName]($api_root)
})

export default apiMaps;