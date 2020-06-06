const querystring = require("querystring")
const blogRouter = require("./src/router/blog")
const userRouter = require("./src/router/user")
const {getCookieExpires} = require('./src/utils/common')

const {access} = require("./src/utils/log")

const SESSION_DATA = {}

const getPostData = (req) => {
    const p = new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = '';
        req.on("data", (chunk) => {
            postData += chunk.toString() //数据在浏览器传输是流的形式
        })
        req.on("end", () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return p
}

const serverHandle = (req, res) => {
    console.log(req);
    access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)
    // 设置数据返回的格式 JSON
    res.setHeader('content-type', "application/json")
    const url = req.url
    // 把path的值作为req的一个属性给传递下去
    req.path = url.split("?")[0]
    // 解析get请求后面的参数,可以把这个query对象添加给req的属性
    req.query = querystring.parse(url.split("?")[1])

    // 解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ""
    cookieStr.split(";").forEach(item=>{
        if(!item){
            return
        }
        let arr=item.split("=")
        let key = arr[0].trim()
        let val = arr[1].trim()
        req.cookie[key] = val
    })

    let needSetCookie= false
    // 解析session
    let userId = req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }
    }else{
        needSetCookie = true
        userId = Date.now()+"_"+Math.random()
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    getPostData(req).then(postData => {
        // 异步调用，要把所有的请求放到回调成功后的函数
        req.body = postData
        // 首先要将postData数据添加到req的body属性上，然后在传递给不同的路由
        const blogResult = blogRouter(req, res)
        const userData = userRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData=>{
                if(needSetCookie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        // console.log("userData",userData);
        if (userData) {
            // 使用模拟数据
            // res.end(JSON.stringify(userData))
            // return
            if(needSetCookie){
                res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
            }
            userData.then(loginData=>{
                // console.log(loginData);
                res.end(JSON.stringify(loginData))
            })
            return
        }

        res.writeHead(404, { "Content-yype": "text/plain" })
        res.write("404 NOT FOUND PAGE")
        res.end('')
    })

}

module.exports = serverHandle