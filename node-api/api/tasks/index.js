'use strict';

const express = require('express');
const controller = require('./tasks.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');
const NewToken = require('../auths/newToken');

router.post('/', VerifyToken, NewToken, controller.create);
router.get('/', VerifyToken, NewToken, controller.index);
router.get('/details/:id', VerifyToken, NewToken, controller.retrieve);
router.put('/:id', VerifyToken, NewToken, controller.update);
router.put('/done/:id', VerifyToken, NewToken, controller.complete);
router.get('/done/', VerifyToken, NewToken, controller.indexClosed);
router.delete('/:id', VerifyToken, NewToken, controller.delete);

module.exports = router;