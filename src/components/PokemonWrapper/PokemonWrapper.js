'use client';
import React from 'react';
import { styled } from 'styled-components';
import PokeCard from '../PokeCard';
import usePokemon from '@/hooks/usePokemon';
import CMPWinner from '../CMPWinner';

function PokemonWrapper() {

  const [pokemonOne, dispatchOne] = usePokemon();
  const [statsOne, setStatsOne] = React.useState({});

  const [pokemonTwo, dispatchTwo] = usePokemon(); 
  const [statsTwo, setStatsTwo] = React.useState({});

  return (
    <Wrapper>
      <Info>Select two Pok&#233;mon in the calculator to see which pokemon wins in a CMP tie.</Info>
      <CardLayout>
        <PokeCard
          pokemon={pokemonOne}
          dispatch={dispatchOne}
          stats={statsOne}
          setStats={setStatsOne}
        />
        <PokeCard
          pokemon={pokemonTwo}
          dispatch={dispatchTwo}
          stats={statsTwo}
          setStats={setStatsTwo}
        />
      </CardLayout>
      {(!!statsOne.atk && !!statsTwo.atk) &&
      <Result>
        <CMPWinner
          pokemonOne={pokemonOne}
          attackOne={statsOne.atk}
          pokemonTwo={pokemonTwo}
          attackTwo={statsTwo.atk}
        />
      </Result>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(500px, 100%);
`

const CardLayout = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

const Info = styled.p`
  width: 360px;
`

const Result = styled.div`
  grid-column: -1 / 1;
  display: flex;
  justify-content: center;
  padding: 10px;
`;

export default PokemonWrapper;
