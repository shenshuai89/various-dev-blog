const mysql = require("mysql")
const con = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"123456",
    port:3306,
    database:"various_blog"
})

con.connect((err)=>{
    if(err){
        throw new Error(err)
        return
    }
    console.log("connect success");
})

con.query(`select * from users`, (err,rows, fields)=>{
    if(err){
        console.error("查询出错",err);
        return
    }
    console.log(rows);
})

con.end()