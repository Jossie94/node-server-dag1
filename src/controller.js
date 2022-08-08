const cnf = require("./config/serverconfig.json");
const {sendText, sendJSON, sendFile, redirect} = require("./utilities");

module.exports = function(req, res) {
    const url = new URL(req.url, cnf.host + ":" + cnf.port);

    const endpoint = url.pathname;
    if(endpoint === "/") {
        redirect(res, "http://localhost:3003/html/index.html");
        return;
    }
    const regex = /^\/(html|css|img|js)\/[\w-]+\.(html|css|js|jpe?g|png|gif|bmp|svg|tiff)$/i;

    const regexRes = endpoint.match(regex);
    console.log(regexRes);
    if(regexRes) {
        // sendJSON(req, res, regexRes);
        sendFile(req, res, cnf.docroot + regexRes[0]);
        return;
    }

    // hvis jeg er her er der ikke fundet et match
    
    sendJSON(req, res, {msg: "resourcen findes ikke", endpoint: endpoint}, 404);
    
}