const { postUsersModel } = require('./users.model');

const postUsersController = (req, res) => {
    try {
        const result = postUsersModel(req.body);

        res.status(201).send(`Utilisateur inséré dans la BDD !`);
    } catch (err) {
        return res.status(400).send(err.message);
    }
}


module.exports = {
    postUsersController,
    
}