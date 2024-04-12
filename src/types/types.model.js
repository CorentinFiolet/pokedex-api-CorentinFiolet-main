const {db} = require('../db');

const getTypesModel = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM types;`, (err, rows) => {
            
            if (err) reject(err.message);

            resolve(rows);
        });
    })
};

const getTypeIdModel = (id) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM types WHERE id = ?;`, id, (err, row) => {
            if (err) reject(err.message);

            resolve(row);
        });
    })
}

module.exports = {
    getTypesModel,
    getTypeIdModel
};