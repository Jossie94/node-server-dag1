const {readFile, createReadStream} = require("fs");
const { extname } = require("path");
const { hrtime } = require("process");
const mimetype = require("./minetypes")

exports.sendText = function(req, res, msg, status = 200) {
    res.statusCode = status;
    res.setHeader("Content-type", "text/plain");
    res.end(msg);
}

exports.sendJSON = function(req, res, msg, status = 200) {
    res.statusCode = status;
    res.setHeader("Content-type", "application/json");
    res.end(JSON.stringify(msg));
}

exports.sendFile = function(req, res, filename) {
    const mime = extname (filename);
    const type = mimetype[mime].type;
    readFile(filename, function(err, filecontent) {
        if(err) {
            exports.sendJSON(req, res, {"error": err.message}, 404);
            return;
        }
        // hvis jeg er her er der fundet en fil
        res.statusCode = 200;
        res.setHeader("Content-type", type);
        res.end(filecontent);
    })
}

exports.streamFile=function(req, res, filename){
    const mime = extname (filename);
    const type = mimetype[mime].type;
    const stream = createReadStream(filename);
    stream.on("error", function(err){
        console.log(err);
        exports.sendJSON(req, res, {error: {msg: "Det lykkes ikke"}}, 404);
        return;
    });
    res.statusCode= 200;
    res.setHeader("Content-type", type);
    stream.pipe(res);
}

exports.redirect = function(res, url) {
    res.statusCode = 301;
    res.setHeader("Location", url);
    res.end();
}

exports.logger = function(req, res){
    const startTime = hrtime.bigint();
    let logstr = new Date().toLocaleString();
    logstr += `${req.method}; ${req.url}`;
    res.on("finish", function(){
        const duration=Number(hrtime.bigint()- startTime) /10000000;
        logstr += `${res.statusCode} ${res.statusMessage} ${duration}ms`
        console.log(logstr)

    })

}