'use client';
import React from 'react';
import { styled } from 'styled-components';
import { getBestLevel } from '@/utils/pokeMath';

function StatSection({ pokemon, stats, setStats, entry, multipliers }) {
  const { name, form, atkIV, defIV, staIV } = pokemon;
  const { base_attack, base_defense, base_stamina } = entry;

  React.useEffect(() => {
    const calcStats = getBestLevel(base_attack, atkIV, base_defense, defIV, entry.base_stamina, staIV, multipliers);
    setStats(calcStats);
  }, [entry, atkIV, defIV, staIV, multipliers])

  let displayName = `${name}`;
  if (form !== "Normal") {
    displayName += ` (${form})`;
  }

  return (
    <Stats>
      <p>{displayName}</p>
      <div>CP: {stats.cp}</div>
      <div>Level: {stats.level}</div>
      <div>attack: {stats.atk}</div>
      <div>defense: {stats.def}</div>
      <div>stamina: {stats.sta}</div>
      <div>statProduct: {stats.sp}</div>
    </Stats>
  )

}

const Stats = styled.div`
  overflow-wrap: break-word;
`;

export default StatSection;