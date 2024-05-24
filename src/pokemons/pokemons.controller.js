const { getPokemonsModel, getPokemonsIdModel, postPokemonsModel, patchPokemonsModel, deletePokemonsModel } = require('./pokemon.model');
const { getTypesModel } = require('../types/types.model');
const { verifyJWT } = require('../common/jwt.middleware');

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

const postPokemonsController = async (req, res) => {
    try {
        let pre_evol_exist = false;
        let post_evol_exist = false;
        let type1_exist = false;
        let type2_exist = false;
        let name_exist = false;
        let pokedex_id_exist = false;
        const body = req.body;
        const pokemons = await getPokemonsModel();
        const types = await getTypesModel();

        types.forEach(type => {
            if (type.id === body.type1_id) {
                type1_exist = true;
            }
            if (type.id === body.type2_id) {
                type2_exist = true;
            }
        });

        if(body.type2_id === null) type2_exist = true;

        if (! type1_exist) {
            return res.status(400).send(`Le type 1 renseigné n'existe pas !`);
        }
        if (! type2_exist) {
            return res.status(400).send(`Le type 2 renseigné n'existe pas !`);
        }


        pokemons.forEach(pokemon => {
            if (pokemon.pokedexId === body.pre_evolution) {
                pre_evol_exist = true;
            }
            if (pokemon.pokedexId === body.post_evolution) {
                post_evol_exist = true;
            }
            if (pokemon.pokedexId === body.pokedexId) {
                pokedex_id_exist = true;
                return;
            }
            if (pokemon.nom === body.name){
                name_exist = true;
                return;
            }
        });

        if(pokedex_id_exist) {
            return res.status(400).send(`Le pokedexId existe déjà !`);
        }

        if(name_exist) {
            return res.status(400).send(`Ce nom de pokémon est déjà utilisé !`);
        }

        if (body.pre_evolution === null) {
            pre_evol_exist = true;
        }
        if (body.post_evolution === null) {
            post_evol_exist = true;
        }

        if (! pre_evol_exist) {
            return res.status(400).send(`La pré évolution n'existe pas`)
        }
        if (! post_evol_exist) {
            return res.status(400).send(`La post évoliution n'existe pas`)
        }

        const result = postPokemonsModel(req.body);

        res.status(201).send(`Pokemon inséré dans la BDD !`);

    }
    catch (err) {
        res.status(400).send(err.message);
    }
}

const patchPokemonsController = async (req, res) => {
    try {
        let pre_evol_exist = false;
        let post_evol_exist = false;
        let type1_exist = false;
        let type2_exist = false;
        const body = req.body;
        const pokemons = await getPokemonsModel();
        const types = await getTypesModel();

        types.forEach(type => {
            if (type.id === body.type1_id) {
                type1_exist = true;
            }
            if (type.id === body.type2_id) {
                type2_exist = true;
            }
        });

        if(body.type2_id === null) type2_exist = true;

        if (! type1_exist) {
            return res.status(400).send(`Le type 1 renseigné n'existe pas !`);
        }
        if (! type2_exist) {
            return res.status(400).send(`Le type 2 renseigné n'existe pas !`);
        }


        pokemons.forEach(pokemon => {
            if (pokemon.pokedexId === body.pre_evolution) {
                pre_evol_exist = true;
            }
            if (pokemon.pokedexId === body.post_evolution) {
                post_evol_exist = true;
            }
            if (pokemon.pokedexId === body.pokedexId) {
                return res.status(400).send(`Le pokedexId existe déjà !`);
            }
            if (pokemon.nom === body.name){
                return res.status(400).send(`Ce nom de pokémon est déjà utilisé !`);
            }
        });

        if (body.pre_evolution === null) {
            pre_evol_exist = true;
        }
        if (body.post_evolution === null) {
            post_evol_exist = true;
        }

        if (! pre_evol_exist) {
            return res.status(400).send(`La pré évolution n'existe pas`)
        }
        if (! post_evol_exist) {
            return res.status(400).send(`La post évoliution n'existe pas`)
        }

        const result = patchPokemonsModel(req.body, req.params.pokedexId);

        res.status(200).send();
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const deletePokemonsController = (req, res) => {
    try {
        const result = deletePokemonsModel(req.params.pokedexId);

        res.status(200).send("le pokémon " + req.params.pokedexId + " a été supprimé.");
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