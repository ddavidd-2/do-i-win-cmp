// get the all IV combinations for a specific pokemon sorted by greatest stat product
export function getAllIVs(pokemonName, form, multipliers, pokedex) {
  const pkm = pokedex.find((p) => p.pokemon_name === pokemonName && p.form === form);
  if (!pkm) {
    return 'Pokemon Not Found';
  }
  return calculateIVs(pkm, multipliers);
}

export function calculateIVs(pkm, cpMultipliers) {
  const MAX_IV = 15;
  const ivTable = [];

  const atkBase = pkm.base_attack;
  const defBase = pkm.base_defense;
  const staBase = pkm.base_stamina;

  for (let atkIV = 0; atkIV <= MAX_IV; atkIV++) {
    for (let defIV = 0; defIV <= MAX_IV; defIV++) {
      for (let staIV = 0; staIV <= MAX_IV; staIV++) {
        const bestLevel = getBestLevel(atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers)
        ivTable.push(bestLevel);
      }
    }
  }

  ivTable.sort((a, b) => b.sp - a.sp);
  return ivTable;
}

export function getBestIVs(entry, multipliers) {
  return calculateIVs(entry, multipliers)[0];
}

// Returns the stats for highest level for a specific iv set under 1500 
export function getBestLevel(atkBase, atkIV, defBase, defIV, staBase, staIV, cpMultipliers) {
  let bestLevelStats = undefined;
  for (let level = 1; level <= 51; level += 0.5) {
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

/*
const multipliers = require('../../data/cpm.json');
console.log(getBestLevel(198, 1, 189, 12, 190, 13, multipliers));
*/