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
      <Stat>
        <div>Atk: {stats.atk}</div>
        <StatBar stat={stats.atk} />
      </Stat>
      <Stat>
        <div>Def: {stats.def}</div>
        <StatBar stat={stats.def} />
      </Stat>
      <Stat>
        <div>HP: {stats.sta}</div>
        <StatBar stat={stats.sta} />
      </Stat>
      <div>Total Stat Product: {stats.sp}</div>
    </Stats>
  )

}

const Stats = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CombatPower = styled.div`
  margin-bottom: 10px;
`

const Stat = styled.div`
  display: grid;
  grid-template-columns: 95px 1fr;
`

export default StatSection;