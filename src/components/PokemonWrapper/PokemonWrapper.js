'use client';
import React from 'react';
import { styled } from 'styled-components';
import PokeCard from '../PokeCard/PokeCard';
import usePokemon from '@/hooks/usePokemon';

function PokemonWrapper({ pokedex, multipliers }) {

  const [pokemonOne, dispatchOne] = usePokemon();
  const [pokemonTwo, dispatchTwo] = usePokemon(); 

  return (
    <Wrapper>
      <Info>Select two Pok&#233;mon in the calculator to see which pokemon wins in a CMP tie.</Info>
      {JSON.stringify(pokemonOne)}
      <CardLayout>
        <PokeCard
          pokemon={pokemonOne}
          dispatch={dispatchOne}
          pokedex={pokedex}
          multipliers={multipliers}
        />
        <PokeCard
          pokemon={pokemonTwo}
          dispatch={dispatchTwo}
          pokedex={pokedex}
          multipliers={multipliers}
        />
      </CardLayout>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const CardLayout = styled.div`
  display: flex;
  justify-content: space-around;
`

const Info = styled.p`
  grid-column: -1 / 1;
`

export default PokemonWrapper;
