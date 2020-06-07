const http = require('http')

function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve(
                    fn(ctx, dispatch.bind(null, i + 1))
                )
            } catch (err) {
                return Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}
class MinKoa2 {
    constructor() {
        this.middlewareList = []
    }
    use(fn) {
        this.middlewareList.push(fn)
        // 为了中间件能够链式调用
        return this
    }

    createContext(req, res) {
        const ctx = { req, res }
        ctx.query = req.query
        return ctx
    }

    handleRequest(ctx, fn){
        return fn(ctx)
    }

    callback() {
        let fn = compose(this.middlewareList)

        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = MinKoa2
