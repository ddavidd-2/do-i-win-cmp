'use client';
import React from 'react';
import { styled } from 'styled-components';
import StatSection from '../StatSection';
import PokemonSearch from '../PokemonSearch/PokemonSearch';
import pokedex from '../../../public/rawPokemonStats.json';
import multipliers from '../../../public/cpm.json';

function PokeCard({ pokemon, dispatch, stats, setStats }) {

  const [isPokemonChosen, setIsPokemonChosen] = React.useState(false);
  const [pokedexEntry, setPokedexEntry] = React.useState({});

  function handleAttack(event) {
    const input = Number(event.target.value);
    if (input > 15 || input < 0) {
      return;
    }
    dispatch({ type: "attack", value: input });
  }

  function handleDefense(event) {
    const input = Number(event.target.value);
    if (input > 15 || input < 0) {
      return;
    }
    dispatch({ type: "defense", value: input });
  }

  function handleStamina(event) {
    const input = Number(event.target.value);
    if (input > 15 || input < 0) {
      return;
    }
    dispatch({ type: "stamina", value: input });
  }

  function handleName(event) {
    dispatch({ type: "name", value: event.target.value });
    setIsPokemonChosen(true);
  }

  function handleForm(event) {
    dispatch({ type: "form", value: event.target.value });
  }


  return (
    <Wrapper>
      <Form>
        <PokemonSearch
          inputState={pokemon.displayName}
          inputHandler={handleName}
          setPokedexEntry={setPokedexEntry}
        />
        {isPokemonChosen &&
          <>
            <FormSection>
              <label htmlFor="form"></label>
            </FormSection>
            <IVSection>
              <div>IVs:{" "}</div>
              <IVInput
                id="atkIV"
                name="atkIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.atkIV}
                onChange={handleAttack}
              />
              /
              <IVInput
                id="defIV"
                name="defIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.defIV}
                onChange={handleDefense}
              />
              /
              <IVInput
                id="staIV"
                name="staIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.staIV}
                onChange={handleStamina}
              />
            </IVSection>
          </>
        }
      </Form>
      {isPokemonChosen &&
        <StatSection
          pokemon={pokemon}
          stats={stats}
          entry={pokedexEntry}
          setStats={setStats}
        />
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 200px;
  width: fit-content;
`;

const IVSection = styled.div`
  display: flex;
`

const FormSection = styled.div`

`;

const IVInput = styled.input`
  display: inline;
  background-color: transparent;
  border: none;
  width: 2rem;
  border-bottom: 1px solid black;

  &:focus {
    outline: none;
    border-bottom: 2px solid red;
  }
`


export default PokeCard;
