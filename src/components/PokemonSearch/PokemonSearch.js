'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/pokedex';

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
        let display = `${p.pokemon_name}`;
        if (p.form !== 'Normal') {
          display += ` (${p.form})`;
        }
        return (
          <option
            key={display}
            value={p.pokemon_name}
            label={display}
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
  background-color: var(--color-primary-white);

  &:hover {
    box-shadow: 1px 2px 4px 0px gray;
    background-color: var(--color-primary-white-hover);
  }
`;

export default PokemonSearch;
