'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/rawPokemonStats';

function PokemonSearch({ inputHandler, inputState, setPokedexEntry }) {

  function handleSelect(event) {
    inputHandler(event);
    const entry = pokedex.find(p => p.pokemon_name === event.target.value && p.form === "Normal");
    setPokedexEntry(entry);
  } 

  return (
    <Wrapper>
      <Label htmlFor="pokemon-name">Pokemon:</Label>
      <Select
        type="xt"
        id="pokemon-name"
        value={inputState}
        onChange={handleSelect}
        autoCapitalize="on"
      >
        {pokedex.filter(p => p.form === 'Normal').map(p =>{
          let display = `${p.pokemon_name}`;
          if (p.form !== 'Normal') {
            display += ` (${p.form})`;
          }

          return (
            <Option 
              key={display} 
              value={p.pokemon_name}
              label={display}
            />
          );
        })}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`

`;

const Select = styled.select`

`;

const Option = styled.option`

`;

export default PokemonSearch;
