'use strict';

const express = require('express');
const controller = require('./intimations.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');
const NewToken = require('../auths/newToken');

// Standard Requests
router.post('/', /*VerifyToken, NewToken,*/ controller.create);
router.get('/', /*VerifyToken, NewToken, */ controller.index);
router.get('/details/:id', VerifyToken, NewToken, controller.retrieve);
router.put('/:id', VerifyToken, NewToken, controller.update);
router.delete('/:id', VerifyToken, NewToken, controller.delete);

/*
// User Requests
router.put('/done/:id', VerifyToken, NewToken, controller.complete);
router.get('/user/', VerifyToken, NewToken, controller.indexUser);


// Admin Requests
router.get('/done/', VerifyToken, NewToken, controller.indexClosed);

/* General: Insert, Get All, Edit, Delete */

module.exports = router;
