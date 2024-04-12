const express = require('express');
const { getTypesController, getTypesIdController } = require('./types.controller');

const router = express.Router()

router.get('/', (req, res) =>{
    getTypesController(req, res);
});

router.get('/:typeId', (req, res) => {
    getTypesIdController(req, res);
});

module.exports = router;