const Mock = require("mockjs")
const {exec} = require("../db/mysql")

// let list = []
// for (let i = 0; i < 20; i++) {
//     let listObject = {
//         id: i + 1,
//         title: Mock.Random.csentence(5, 30),
//         content: Mock.Random.csentence(50, 100),//  Mock.Random.csentence( min, max )
//         author_name: Mock.Random.cname(), // Mock.Random.cname() 随机生成一个常见的中文姓名
//         createTime: Mock.Random.date() + ' ' + Mock.Random.time() // Mock.Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Mock.Random.time() 返回一个随机的时间字符串
//     }
//     list.push(listObject)
// }
const getList = (author, keyword) => {
    // 先返回mock数据
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author = '${author}'`
    }
    if(keyword){
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc`
    return exec(sql)
}
// 获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id=${id}`
    return exec(sql).then(rows=>{
        return rows[0]
    })
}

// 新建一篇博客
const newBlog = (blog = {}) => {
    const {title, content, author} = blog
    // console.log(title,content,author);
    let createtime = Date.now()
    const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createtime})`
    return exec(sql).then(insertData=>{
        console.log("insertData is :",insertData);
        return {
            id: insertData.insertId
        }
    })
}

// 更新一篇博客
const updateBlog = (id, blog={})=>{
    const {title, content} = blog
    let sql = `update blogs set title='${title}', content='${content}' where id='${id}'`
    return exec(sql).then(res=>{
        console.log(`update 更新`,res);
        if(res.affectedRows > 0){
            return true
        }
        return false
    })
}
// 删除一篇博客
const delBlog = (id, author) =>{
    let sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(res=>{
        if(res.affectedRows > 0){
            return true
        }
        return false
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}