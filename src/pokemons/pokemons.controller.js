const { getPokemonsModel, getPokemonsIdModel, postPokemonsModel, patchPokemonsModel, deletePokemonsModel } = require('./pokemon.model');

const getPokemonsController = async (_req, res) => {
    try {
        const pokemons = await getPokemonsModel();

        if (pokemons.length === 0) return res.status(204).send(pokemons);

        return res.status(200).send(pokemons);
    } 
    catch (err) {
        return res.status(500).send(err.message);
    }
}

const getPokemonsIdController = async (req, res) => {
    try {
        const pokemon = await getPokemonsIdModel(req.params.pokedexId);

        if (pokemon == null) return res.status(204).send('Pas de données')

        return res.status(200).send(pokemon);
    }
    catch (err) {
        return res.status(500).send(err.message);
    }
};

const postPokemonsController = (req, res) => {
    try {
        const result = postPokemonsModel(req.body);

        res.status(201).send(`Pokemon inséré dans la BDD !`);

    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const patchPokemonsController = (req, res) => {
    try {
        const result = patchPokemonsModel(req.body, req.params.pokedexId);

        res.status(200).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const deletePokemonsController = (req, res) => {
    try {
        const result = deletePokemonsModel(req.params.pokedexId);

        res.status(200).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports =  {
    getPokemonsController,
    getPokemonsIdController,
    postPokemonsController,
    patchPokemonsController,
    deletePokemonsController
}