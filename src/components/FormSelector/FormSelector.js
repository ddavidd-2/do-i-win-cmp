'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/rawPokemonStats';

function FormSelector({ pokemon, formHandler, setPokedexEntry }) {

  function handleSelect(event) {
    formHandler(event);
    const entry = pokedex.find(p => p.pokemon_name === pokemon.name && p.form === event.target.value);
    setPokedexEntry(entry);
  }

  return (
    <Select
      id="pokemon-form"
      value={pokemon.form}
      onChange={handleSelect}
    >
      {pokedex.filter(p => p.pokemon_name === pokemon.name)
        .map(p => {
          return (
            <option
              key={p.form}
              value={p.form}
              label={p.form}
            />
          )
        })}
    </Select>
  );
}

const Select = styled.select`
  display: inline-block;
  border: 1px solid black;
  border-radius: 10px;
  padding: 1px 2px;
  background-color: var(--color-primary-white);
  margin-top: 2px;
  margin-left: 2px;

  &:hover {
    box-shadow: 1px 2px 4px 0px gray;
    background-color: var(--color-primary-white-hover);
  }
`;

export default FormSelector;
