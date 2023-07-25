'use client';
import React from 'react';
import { styled } from 'styled-components';

function PokemonSearch({ pokedex, inputHandler, inputState }) {

  return (
    <Wrapper>
      <Label htmlFor="pokemon-name">Pokemon:</Label>
      <Select
        type="xt"
        id="pokemon-name"
        value={inputState}
        onChange={inputHandler}
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
