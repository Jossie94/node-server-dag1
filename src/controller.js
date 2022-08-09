const cnf = require("./config/serverconfig.json");
const {sendText, sendJSON, sendFile, redirect, logger, streamFile} = require("./utilities");
const api= {
    "cat": require("./api/cat")
};

module.exports = function(req, res) {
    logger(req, res);
    const url = new URL(req.url, cnf.host + ":" + cnf.port);

    const endpoint = url.pathname;
    if(endpoint === "/") {
        redirect(res, "http://localhost:3003/html/index.html");
        return;
    }
    let regex = /^\/(html|css|img|js)\/[\w-]+\.(html|css|js|jpe?g|png|gif|bmp|svg|tiff)$/i;

    let regexRes = endpoint.match(regex);
    console.log(regexRes);
    if(regexRes) {
        // sendJSON(req, res, regexRes);
        streamFile(req, res, cnf.docroot + regexRes[0]);
        return;
    }

    regex= /\/api\/(?<route>\w+)(?<param>\/\d+)?/
    regexRes = endpoint.match(regex);
    if(regexRes){
        if (api[regexRes.groups.route]){
            if(api[regexRes.groups.route][req.method]){
                api[regexRes.groups.route][req.method].handler(req, res, regexRes.groups.param);
                return;
            }
            sendJSON(req, res, {msg: `Method ${req.method} not allowed here`}, 405);
            return;

        }
    }

    // hvis jeg er her er der ikke fundet et match

    
    sendJSON(req, res, {msg: "resourcen findes ikke", endpoint: endpoint}, 404);
    
}