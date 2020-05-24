const http = require("http")
const PORT = 8000
const serverHandle = require("../app")

http.createServer(serverHandle).listen(PORT)