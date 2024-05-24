const { db } = require("../db");

const bcrypt = require("bcrypt");

const getHashPass = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT password FROM users WHERE email = ?', email, (err, row) => {
            if (err) {
                console.log("AHHHHHHHHHHHHH!!!!");
                reject("Email incorrect");
            } 

            resolve(row.password);
        });
    })
}

const verifyPassword = async (email, pass) => {
    try {
        const hash = await getHashPass(email);
        return (bcrypt.compare(pass, hash).then(function (result) {
            console.log(result);
            return result;
        }));
    } catch (error) {

        return ("Email Incorrect");
    }
    
}

module.exports = {
    verifyPassword,
}