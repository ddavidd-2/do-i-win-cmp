'use client';
import React from 'react';
import { styled } from 'styled-components';
import { getBestLevel } from '@/utils/pokeMath';
import multipliers from '../../../public/cpm.json';

function StatSection({ pokemon, stats, setStats, entry }) {
  const { name, form, atkIV, defIV, staIV } = pokemon;
  const { base_attack, base_defense, base_stamina } = entry;

  React.useEffect(() => {
    const calcStats = getBestLevel(base_attack, atkIV, base_defense, defIV, base_stamina, staIV, multipliers);
    setStats(calcStats);
  }, [base_attack, base_defense, base_stamina, atkIV, defIV, staIV, multipliers, setStats])

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