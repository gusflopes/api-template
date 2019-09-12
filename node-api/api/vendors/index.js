'use strict';

const express = require('express');
const controller = require('./vendors.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');

const NewToken = require('../auths/newToken');

router.get('/', VerifyToken, NewToken, controller.index);
router.get('/:id', VerifyToken, controller.retrieve);
router.post('/', VerifyToken, controller.create);
router.put('/:id', VerifyToken, controller.update);
router.delete('/:id', VerifyToken, controller.delete);

module.exports = router;