'use client';
import React from 'react';
import { styled } from 'styled-components';
import StatBar from '../StatBar';
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
      <CombatPower>CP: {stats.cp}</CombatPower>
      <StatLabel>atk:</StatLabel>
      <div>{stats.atk}</div>
      <StatBar stat={stats.atk} />
      <StatLabel>def:</StatLabel>
      <div>{stats.def}</div>
      <StatBar stat={stats.def} />
      <StatLabel>hp:</StatLabel>
      <div>{stats.sta}</div>
      <StatBar stat={stats.sta} />
    </Stats>
  )

}

const Stats = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 35px 60px 1fr; 
  grid-template-rows: 30px repeat(3, 1fr);
  align-items: center;
`;

const CombatPower = styled.div`
  margin-bottom: 10px;
  grid-column: 1 / -1;
  grid-row: 1; 
  justify-self: center;
`

const StatLabel = styled.div`
  font-size: var(--font-small);
`

export default StatSection;