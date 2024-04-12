const {db} = require('../src/db.js');

// Crée la table des types et l'alimente si elle est vide
db.run('CREATE TABLE IF NOT EXISTS types (id INTEGER PRIMARY KEY, label TEXT)');
db.all('SELECT * FROM types', (err, rows) => {
  if(!rows || rows.length === 0){
    db.run('INSERT INTO types (label) VALUES ("Plante")');
    db.run('INSERT INTO types (label) VALUES ("Feu")');
    db.run('INSERT INTO types (label) VALUES ("Eau")');
    db.run('INSERT INTO types (label) VALUES ("Electrik")');
    db.run('INSERT INTO types (label) VALUES ("Insecte")');
    db.run('INSERT INTO types (label) VALUES ("Normal")');
    db.run('INSERT INTO types (label) VALUES ("Vol")');
    db.run('INSERT INTO types (label) VALUES ("Poison")');
    db.run('INSERT INTO types (label) VALUES ("Sol")');
    db.run('INSERT INTO types (label) VALUES ("Combat")');
    db.run('INSERT INTO types (label) VALUES ("Psy")');
    db.run('INSERT INTO types (label) VALUES ("Roche")');
    db.run('INSERT INTO types (label) VALUES ("Spectre")');
    db.run('INSERT INTO types (label) VALUES ("Dragon")');
    db.run('INSERT INTO types (label) VALUES ("Acier")');
    db.run('INSERT INTO types (label) VALUES ("Ténèbres")');
    db.run('INSERT INTO types (label) VALUES ("Fée")');
    db.run('INSERT INTO types (label) VALUES ("Glace")');
  }
});

db.run(`CREATE TABLE IF NOT EXISTS pokemons (
  id INTEGER PRIMARY KEY,
  nom VARCHAR(50) UNIQUE NOT NULL,
  pokedexId INTEGER UNIQUE NOT NULL,
  type1_id INTEGER NOT NULL,
  type2_id INTEGER,
  pre_evolution INTEGER,
  post_evolution INTEGER,
  FOREIGN KEY (type1_id) REFERENCES types(id),
  FOREIGN KEY (type2_id) REFERENCES types(id),
  FOREIGN KEY (pre_evolution) REFERENCES pokemons (pokedexId),
  FOREIGN KEY (post_evolution) REFERENCES pokemons (pokedexId))`
  );

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT)`
);