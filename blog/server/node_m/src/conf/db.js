const env = process.env.NODE_ENV

let MYSQL_CONF

if (env == "development") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port: 3306,
        database: "various_blog"
    }
}
if (env == "production") {
    MYSQL_CONF = {
        host: "localhost",
        user: "root",
        password: "123456",
        port: 3306,
        database: "various_blog"
    }
}

module.exports = {
    MYSQL_CONF
}