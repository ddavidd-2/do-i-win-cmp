const cpm = require('../../public/cpm.json');
const pokedex = require('../../public/pokedex.json');

// get the all IV combinations for a specific pokemon sorted by greatest stat product
export function getPokemonIVs(name, form, maxLevel = 51) {
  const pokemon = pokedex.find(p => p.pokemon_name === name && p.form === form);
  if (!pokemon) {
    return []
  }
  return calculateAllIVs(pokemon, cpm, maxLevel);
}

export function calculateAllIVs(pkm, cpMultipliers, maxLevel = 51) {
  const MAX_IV = 15;
  const ivTable = [];

  const atkBase = pkm.base_attack;
  const defBase = pkm.base_defense;
  const staBase = pkm.base_stamina;

  for (let atkIV = 0; atkIV <= MAX_IV; atkIV++) {
    for (let defIV = 0; defIV <= MAX_IV; defIV++) {
      for (let staIV = 0; staIV <= MAX_IV; staIV++) {
        const bestLevel = getBestLevel(atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers, maxLevel)
        ivTable.push(bestLevel);
      }
    }
  }
  ivTable.sort((a, b) => b.sp - a.sp);
  return ivTable;
}

// Returns the stats for highest level for a specific iv set under 1500 
export function getBestLevel(atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers, maxLevel = 51) {
  let bestLevelStats = undefined;
  for (let level = 1; level <= maxLevel; level += 0.5) {
    const stats = calculateStats(atkBase, atkIV, defBase, defIV, staBase, staIV, level, cpMultipliers);
    if (stats.cp <= 1500) {
      bestLevelStats = stats;
    } else {
      break;
    }
  }
  return bestLevelStats;
}

function calculateStats(atkBase, atkIV, defBase, defIV, staBase, staIV, level, cpMultipliers) {
  const attack = calcStat(level, atkBase, atkIV, cpMultipliers);
  const defense = calcStat(level, defBase, defIV, cpMultipliers);
  const stamina = Math.floor(calcStat(level, staBase, staIV, cpMultipliers));
  const combatPower = calcCP(level, atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers);
  const statProduct = calculateStatProduct(attack, defense, stamina);

  return {
    cp: combatPower,
    level: level,
    atkIV: atkIV,
    defIV: defIV,
    staIV: staIV,
    atk: attack,
    def: defense,
    sta: stamina,
    sp: statProduct
  }
}

function calculateStatProduct(attack, defense, stamina) {
  return Number((attack * defense * stamina).toFixed(2));
}

function calcStat(level, baseStat, iv, cpMultipliers) {
  return Number(((baseStat + iv) * cpMultipliers[level]).toFixed(2));
}

function calcCP(level, atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers) {
  const atk = atkBase + atkIV;
  const def = defBase + defIV;
  const sta = staBase + staIV;
  const mult = cpMultipliers[level];
  return Math.floor(atk * Math.pow(def, 0.5) * Math.pow(sta, 0.5) * Math.pow(mult, 2) / 10);
}

export function getIVs(name, form) {
  const list40 = getPokemonIVs(name, form, 40);
  const list41 = getPokemonIVs(name, form, 41);
  const list50 = getPokemonIVs(name, form, 50);
  const list51 = getPokemonIVs(name, form, 51);
  return [list40, list41, list50, list51];
}