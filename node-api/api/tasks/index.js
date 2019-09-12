'use strict';

const express = require('express');
const controller = require('./tasks.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');


router.post('/', VerifyToken, controller.create);
router.get('/', VerifyToken, controller.index);
router.get('/details/:id', VerifyToken, controller.retrieve);
router.put('/:id', VerifyToken, controller.update);
router.put('/done/:id', VerifyToken, controller.complete);
router.get('/done/', VerifyToken, controller.indexClosed);
router.delete('/:id', VerifyToken, controller.delete);

module.exports = router;