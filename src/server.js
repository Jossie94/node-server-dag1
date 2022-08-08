const cnf = require("./config/serverconfig.json");
const http = require("http");

const controller = require("./controller");

http.createServer(controller).listen(cnf.port);
console.log("Server er startet. Gå til " + cnf.host + ":" + cnf.port);