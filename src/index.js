const express = require('express');
const bodyParser = require('body-parser');
const typesRouter = require('./types/types.routes');
const pokemonsRouter = require('./pokemons/pokemon.routes');

const port = 3000;
const app = express();

app.use(bodyParser.json());

app.use('/types' ,typesRouter);
app.use('/pokemons', pokemonsRouter);

app.listen(port);