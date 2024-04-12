const express = require('express');
const { getPokemonsController, getPokemonsIdController, postPokemonsController, patchPokemonsController, deletePokemonsController } = require('./pokemons.controller');

const router = express.Router();

router.get('/', (req, res) =>{
    getPokemonsController(req, res);
});

router.get('/:pokedexId', (req, res) =>{
    getPokemonsIdController(req, res);
});

router.post('/', (req, res) => {
    postPokemonsController(req, res);
});

router.patch('/:pokedexId', (req, res) => {
    patchPokemonsController(req, res);
})

router.delete('/:pokedexId', (req, res) => {
    deletePokemonsController(req, res);
})

module.exports = router;
