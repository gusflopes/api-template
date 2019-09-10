'use strict';
const express = require('express');
const controller = require('./vendors.controller');
const router = express.Router();
router.get('/', controller.index);
router.get('/:id', controller.retrieve);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;