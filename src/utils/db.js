import pokedex from '../../public/pokedex.json';
import { getPokemonIVs } from './pokeMath';
import { tursoClient } from './tursoClient';

/* DB INITIALIZATION FUNCTIONS */
export async function initPokedex() {
  const res = await fillPokemonTable(tursoClient);
  return res;
}

async function fillPokemonTable(client) {
  console.log('beginning!');
  pokedex.slice(770, pokedex.length - 1).forEach(async (pkm, i) => {
    try {
      await client.execute({
        sql: `INSERT OR IGNORE INTO pokemon (id, pokedex_id, name, form, primary_type, secondary_type, base_attack, base_defense, base_stamina)
          values ($id, $pokedex_id, $name, $form, $primary_type, $secondary_type, $base_attack, $base_defense, $base_stamina);`,
        args: {
          pokedex_id: pkm.pokemon_id,
          name: pkm.pokemon_name,
          form: pkm.form,
          primary_type: pkm.type[0],
          secondary_type: pkm.type[1] ?? null,
          base_attack: pkm.base_attack,
          base_defense: pkm.base_defense,
          base_stamina: pkm.base_stamina,
        }
      });
    } catch (e) {
      console.log(`error on ${pkm.pokemon_name}`);
    }
  })
  console.log('ended!')
  return 200;
}


export async function fillIVTable() {
  try {
    const res = await tursoClient.execute('SELECT id, name, form FROM pokemon;');
    for (const pkm of res.rows) {
      const { id, name, form } = pkm;
      await fillIVTableLevel(tursoClient, id, name, form, 40);
      await fillIVTableLevel(tursoClient, id, name, form, 41);
      await fillIVTableLevel(tursoClient, id, name, form, 50);
      await fillIVTableLevel(tursoClient, id, name, form, 51);
    }
    return 200;
  } catch (e) {
    console.error(e);
    return 500;
  }
}

async function fillIVTableLevel(client, id, name, form, level) {
  console.log(`starting level ${level} for ${name}`);
  const ivList = getPokemonIVs(name, form, level);
  const statements = ivList.map((iv, index) => {
    return {
      sql: `INSERT OR IGNORE INTO iv_rankings(level_cap, pokemon_id, atk_iv, def_iv, sta_iv, ranking, cp, lvl, attack, defense, stamina, stat_product) 
        values (:level_cap, :pokemon_id, :atk_iv, :def_iv, :sta_iv, :ranking, :cp, :lvl, :attack, :defense, :stamina, :stat_product);`,
      args: {
        level_cap: level,
        pokemon_id: id,
        atk_iv: iv.atkIV,
        def_iv: iv.defIV,
        sta_iv: iv.staIV,
        ranking: index + 1,
        cp: iv.cp,
        lvl: iv.level,
        attack: iv.atk,
        defense: iv.def,
        stamina: iv.sta,
        stat_product: iv.sp
      }
    }
  });
  console.log('before batch'); 
  try {
    const res = await client.batch(statements, 'write');
    console.log(`finished with level ${level} for ${name}`);
  } catch (e) {
    console.error(e);
    console.log(`error with level ${level} for ${name}`);
  }
}

/* GETTERS */
export async function getAllPokemon() {
  try {
    const res = await tursoClient.execute('select * from pokemon;')
    return {
      status: 200,
      data: res.rows
    };
  } catch (e) {
    console.error(e);
    return {
      status: 500
    }
  }
}

export async function getIVTables(id) {
  try {
    const rss = await tursoClient.batch([{
      sql: 'SELECT * from iv_rankings where pokemon_id = :id AND level_cap = :level;',
      args: {
        id: id,
        level: 40
      }
    },
    {
      sql: 'SELECT * from iv_rankings where pokemon_id = :id AND level_cap = :level;',
      args: {
        id: id,
        level: 41
      }
    },
    {
      sql: 'SELECT * from iv_rankings where pokemon_id = :id AND level_cap = :level;',
      args: {
        id: id,
        level: 50
      }
    },
    {
      sql: 'SELECT * from iv_rankings where pokemon_id = :id AND level_cap = :level;',
      args: {
        id: id,
        level: 51
      }
    }]);

    return {
      status: 200,
      data: {
        list40: rss[0].rows,
        list41: rss[1].rows,
        list50: rss[2].rows,
        list51: rss[3].rows
      } 
    }
  } catch (e) {
    console.error(e);
    return {
      status: 500
    }
  }
}