const express = require('express');
const { postUsersController } = require('./users.controller');

const router = express.Router();

router.post('/', (req, res) => {
    postUsersController(req, res);
});