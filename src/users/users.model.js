const db = require('../db');

const postUsersModel = (body) => {
    db.run(`INSERT INTO users (email, password) = (?, ?)`, [body.email, body.password]);
}


module.exports = {
    postUsersModel,

}