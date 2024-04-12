const {db} = require('../db');

const getPokemonsModel = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM pokemons;`, (err, rows) => {

            if (err) reject(err.message);

            resolve(rows);
        });
    })
};

const getPokemonsIdModel = (pokedexId) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM pokemons WHERE pokedexId = ?;`, pokedexId, (err, pokemon) =>{
            
            if (err) reject(err.message);

            resolve(pokemon);
        });
    })
}

const postPokemonsModel = (body) => {
    db.run(`INSERT INTO pokemons (nom, pokedexId, type1_id, type2_id, pre_evolution, post_evolution) VALUES (?, ?, ?, ?, ?, ?)`, [body.name, body.pokedexId, body.type1_id, body.type2_id, null, null]);
}

const patchPokemonsModel = (body, pokedexId) => {
    db.run(`UPDATE pokemons SET nom = ?, pokedexId = ?, type1_id = ?, type2_id = ?, pre_evolution = ?, post_evolution = ? WHERE pokedexId = ?`, [body.name, body.pokedexId, body.type1_id, body.type2_id, null, null, pokedexId])
}

const deletePokemonsModel = (pokedexId) => {
    db.run(`DELETE FROM pokemons WHERE pokedexId = ?`, [pokedexId]);
}


module.exports = {
    getPokemonsModel,
    getPokemonsIdModel,
    postPokemonsModel,
    patchPokemonsModel,
    deletePokemonsModel
}