const Mock = require("mockjs")

const getList = (author, keyword) => {
    // 先返回mock数据
    return [Mock.mock({
        "number|+1": 202
      })]
}

module.exports = {
    getList
}