const express = require('express');
const { postUsersController, loginUsersController } = require('./users.controller');

const router = express.Router();

router.post('/', (req, res) => {
    postUsersController(req, res);
});

router.post('/login', (req, res) => {
    loginUsersController(req, res);
})

module.exports = router;