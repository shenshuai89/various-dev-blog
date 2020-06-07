const Service = require("egg").Service
const mysql = require("mysql")

class BlogService extends Service {
    async list(author,keyword) {
        const { app } = this;
        try {
            let sql = `select * from blogs where 1=1 `
            if(author){
                sql += ` and author = ${mysql.escape(author)}`
            }
            if(keyword){
                sql += ` and title like '%${keyword}%'`
            }
            sql += ` order by createtime desc`

            return await app.mysql.query(sql);
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async detail(id) {
        if (!id) {
            console.log("id必须存在");
            return null
        }
        try {
            return await this.app.mysql.get("blogs", { id })
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async create(obj) {
        if (!obj) {
            console.log("id必须存在");
            return null
        }
        // title, content, author, createtime
        let createtime = Date.now()
        // let author = "zhangsan"
        // console.log("author", author);
        try {
            return await this.app.mysql.insert("blogs", { createtime, ...obj })
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async update(obj) {
        if (!obj) {
            console.log("id必须存在");
            return null
        }
        try {
            return await this.app.mysql.update("blogs", { ...obj })
        } catch (err) {
            console.log(err);
            return null
        }
    }
    async del(obj) {
        if (!obj) {
            console.log("id必须存在");
            return null
        }
        try {
            return await this.app.mysql.delete("blogs", { ...obj })
        } catch (err) {
            console.log(err);
            return null
        }
    }
}

module.exports = BlogService