const Mock = require("mockjs")

let list = []
for (let i = 0; i < 20; i++) {
    let listObject = {
        id: i + 1,
        title: Mock.Random.csentence(5, 30),
        content: Mock.Random.csentence(50, 100),//  Mock.Random.csentence( min, max )
        author_name: Mock.Random.cname(), // Mock.Random.cname() 随机生成一个常见的中文姓名
        createTime: Mock.Random.date() + ' ' + Mock.Random.time() // Mock.Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Mock.Random.time() 返回一个随机的时间字符串
    }
    list.push(listObject)
}
const getList = (author, keyword) => {
    // 先返回mock数据
    return list
}
// 获取博客详情
const getDetail = (id) => {
    return {
        "id": 5,
        "title": "且收方议象整验想带周那自切马切。",
        "content": "者事西后一质领土精议象局速务然制花集况间照业整观解适压院太作如济以积无收时按经通政通问实月办步过文速三两高机酸年存示育前极约斯多光广会能物当本圆然之题支。",
        "author_name": "赵洋",
        "createTime": "1988-01-25 17:32:19"
    }
}

// 新建一篇博客
const newBlog = (blog = {}) => {
    return {
        id: 1
    }
}

// 更新一篇博客
const updateBlog = (id, blog={})=>{
    console.log('更新博客内容', id, blog);
    return true
}
// 删除一篇博客
const delBlog = (id) =>{
    console.log(`删除的博客id是`, id);
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}