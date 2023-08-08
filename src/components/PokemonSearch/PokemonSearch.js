'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/pokedex';
import { QUERIES } from '@/constants';

function PokemonSearch({ inputHandler, setPokedexEntry, setBestIVs }) {

  function handleSelect(event) {
    inputHandler(event);
    const entry = pokedex.find(p => p.pokemon_name === event.target.value && p.form === "Normal");
    setPokedexEntry(entry);
    setBestIVs(entry);
  }

  return (
    <Select
      id="pokemon-name"
      defaultValue="Select a Pokemon"
      onChange={handleSelect}
    >
      <option
        value="Select a Pokemon"
        label="Select a Pokemon"
        disabled
      />
      {pokedex.filter(p => p.form === 'Normal').map(p => {
        return (
          <option
            key={p.pokemon_name}
            value={p.pokemon_name}
            label={p.pokemon_name.toString()}
          />
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 30px;
  padding: 2px 4px;

  &:hover {
    box-shadow: 1px 2px 4px 0px gray;
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: 1rem;
  }
`;

export default PokemonSearch;
