const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { postUsersModel } = require('./users.model');
const { verifyPassword } = require('../common/users.middleware');

const postUsersController = (req, res) => {
    try {
        const email = req.body.email;

        let password = req.body.password;
        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                const result = postUsersModel(email, hash);
            })
        })

        

        res.status(201).send(`Utilisateur inséré dans la BDD !`);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}

const loginUsersController = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        if (!await verifyPassword(email, pass)) {
            res.status(400).send("Mot de passe Incorrect");
        }
        else {
            res.status(200).json({
                userMail: email,
                token: jwt.sign(
                    { userMail: email },
                    process.env.JWT_TOKEN_KEY,
                    { expiresIn: "1h"}
                )
            })
        }
        
    } catch (err) {
        return res.status(400).send(err.message);
    }
}


module.exports = {
    postUsersController,
    loginUsersController,
    
}