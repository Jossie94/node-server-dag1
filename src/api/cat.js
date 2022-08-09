const { sendJSON } = require("../utilities")

module.exports={
    GET:{
        handler: function(req, res, param){
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param});
        }
    } ,


    POST:{
        handler: function(req, res, param){
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param});
        }
    },


    PUT:{
        handler: function(req, res, param){
            sendJSON(req, res, {route: "/api/cat", method: req.method, says: "Miauw", param});
        }
    } 
}