const querystring = require("querystring")
const blogRouter = require("./src/router/blog")
const userRouter = require("./src/router/user")

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
    // 设置数据返回的格式 JSON
    res.setHeader('content-type', "application/json")
    const url = req.url
    // 把path的值作为req的一个属性给传递下去
    req.path = url.split("?")[0]
    // 解析get请求后面的参数,可以把这个query对象添加给req的属性
    req.query = querystring.parse(url.split("?")[1])

    getPostData(req).then(postData => {
        req.body = postData
        // 首先要将postData数据添加到req的body属性上，然后在传递给不同的路由
        const blogData = blogRouter(req, res)
        const userData = userRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }

        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }

        res.writeHead(404, { "Content-yype": "text/plain" })
        res.write("404 NOT FOUND PAGE")
        res.end('')
    })



}

module.exports = serverHandle