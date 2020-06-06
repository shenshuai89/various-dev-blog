
// 创建一个对返回值数据做统一处理的类
class BaseModel {
    constructor(data, message) {
        if (typeof data === "string") {
            this.message = data
            // 将data和message置为null，就不执行下边的两个判断条件
            message = null
            data = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }

}
// 成功接收到返回数据的时候
class SucessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0;
    }
}

// 接收到返回数据失败的时候
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1;
    }
}

module.exports = { SucessModel, ErrorModel }