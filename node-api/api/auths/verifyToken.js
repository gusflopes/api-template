var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');
var VerifyToken = express.Router();


VerifyToken.use(function(req, res, next){

    console.log('Verificando token');

    var token = req.headers['x-access-token'];
    if(!token){
        return res.status(403).json({auth: false, message: "No Token"});
    }

    jwt.verify(token, config.secrets.session, function(err, decoded){
        console.log('Token: ' + token);
        console.log('Session: ' + config.secrets.session);
        if(err){
            console.log(err);
            return res.status(401).json({auth: false, message: "Not An Authorized User"});
        }

        req.body.user_id = decoded.user_id;
        req.body.username = decoded.username;
        req.body.organization_id = decoded.organization_id;

        //console.log('Saindo do verifyToken com o token: ' + token);
        next();
    });
});

module.exports = VerifyToken;