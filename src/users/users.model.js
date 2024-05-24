const {db} = require('../db');

const postUsersModel = (email, pwd) => {
    db.run(`INSERT INTO users (email, password) VALUES (?, ?)`, [email, pwd]);
}


module.exports = {
    postUsersModel,

}