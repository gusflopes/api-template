var express = require('express');
var jwt = require('jsonwebtoken');
var config = require('../../config/environment');
var VerifyToken = require('../auths/verifyToken');

var NewToken = express.Router();

NewToken.use(function(req, res, next){

    //console.log('Preparando para Gerar Novo Token');
    /*
    console.log(req.headers['x-access-token']);
    console.log('Session: ' + config.secrets.session);
    console.log('ReqBodyUserId: ' + req.body.user_id);
    */
    
    let payload = {
        user_id : req.body.user_id,
        username : req.body.username,
        organization_id :req.body.organization_id
    }
    
    /*
    console.log("Let Payload");
    console.log(payload);
    */
    
    let token = jwt.sign(payload, config.secrets.session, {
        expiresIn : config.secrets.expiresIn
    });
    //console.log("Lá vai o novo Token: ");
    //console.log(token);

    //console.log("Antigo Token ou Novo?");
    req.headers['x-access-token'] = token;

            next();
            
        })
    /*})*/;


module.exports = NewToken;