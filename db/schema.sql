CREATE TABLE IF NOT EXISTS pokemon (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  pokedex_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  form TEXT NOT NULL, 
  primary_type TEXT NOT NULL,
  secondary_type TEXT,
  base_attack INTEGER NOT NULL,
  base_defense INTEGER NOT NULL,
  base_stamina INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS iv_rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  level_cap INTEGER NOT NULL,
  pokemon_id INTEGER NOT NULL,
  atk_iv INTEGER NOT NULL, 
  def_iv INTEGER NOT NULL,
  sta_iv INTEGER NOT NULL,
  ranking INTEGER NOT NULL,
  cp INTEGER NOT NULL,
  lvl INTEGER NOT NULL, 
  attack REAL NOT NULL,
  defense REAL NOT NULL,
  stamina INTEGER NOT NULL,
  stat_product REAL NOT NULL,

  FOREIGN KEY(pokemon_id) REFERENCES pokemon(id)
);

