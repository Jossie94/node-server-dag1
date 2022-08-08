const {readFile} = require("fs");

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
    readFile(filename, function(err, filecontent) {
        if(err) {
            exports.sendJSON(req, res, {"error": err.message}, 404);
            return;
        }
        // hvis jeg er her er der fundet en fil
        res.statusCode = 200;
        // res.setHeader("Content-type", "text/html");
        res.end(filecontent);
    })
}

exports.redirect = function(res, url) {
    res.statusCode = 301;
    res.setHeader("Location", url);
    res.end();
}