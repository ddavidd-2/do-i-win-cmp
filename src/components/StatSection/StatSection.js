'use client';
import React from 'react';
import { getBestLevel } from '@/utils/pokeMath';
import { styled } from 'styled-components';

function StatSection({ name, form, atkIV, defIV, staIV, pokedex, multipliers }) {

  const displayName = React.useMemo(() => {
    let displayName = `${name}`;
    if (form !== "Normal") {
      displayName += ` (${form})`;
    }
    return displayName;
  }, [name, form]);
  const entry = pokedex.find(p => p.pokemon_name === name && p.form === form);

  if (!!entry) {
    const stats = getBestLevel(entry.base_attack, atkIV, entry.base_defense, defIV, entry.base_stamina, staIV, multipliers);
    return (
      <>
        <p>{displayName}</p>
        <Stats>{JSON.stringify(stats)}</Stats>
      </>
    )
  } else {
    return <></>;
  }

}

const Stats = styled.p`
  overflow-wrap: break-word;
`;

export default StatSection;

/*
  
    return (
      <div>
        <p>{displayName}</p>
        <div>CP: {stats.cp}</div>
        <div>Level: {stats.level}</div>
        <div>attack: {stats.atk}</div>
        <div>defense: {stats.def}</div>
        <div>stamina: {stats.sta}</div>
        <div>statProduct: {stats.sp}</div>
      </div>
    );
    */