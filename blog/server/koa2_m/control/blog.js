// const Mock = require("mockjs")
const {exec} = require("../db/mysql")

const getList = async (author, keyword) => {
    // 先返回mock数据
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author = '${author}'`
    }
    if(keyword){
        sql += `and title like '%${keyword}%'`
    }
    sql += `order by createtime desc`
    return await exec(sql)
}
// 获取博客详情
const getDetail = async (id) => {
    let sql = `select * from blogs where id=${id}`
    let rows = await exec(sql)
    return rows[0]
}

// 新建一篇博客
const newBlog = async (blog = {}) => {
    const {title, content, author} = blog
    // console.log(title,content,author);
    let createtime = Date.now()
    const sql = `insert into blogs (title, content, author, createtime) values ('${title}', '${content}', '${author}', ${createtime})`
    let insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
}

// 更新一篇博客
const updateBlog = async (id, blog={})=>{
    const {title, content} = blog
    let sql = `update blogs set title='${title}', content='${content}' where id='${id}'`
    let result = await exec(sql)
    if(result.affectedRows > 0){
        return true
    }else{
        return false
    }
}
// 删除一篇博客
const delBlog = async (id, author) =>{
    let sql = `delete from blogs where id='${id}' and author='${author}';`
    let result = await exec(sql)
    if(result.affectedRows > 0){
        return true
    }else{
        return false
    }
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}