'use client';
import React from 'react';
import { styled } from 'styled-components';
import StatSection from '../StatSection';
import PokemonSearch from '../PokemonSearch/PokemonSearch';

function PokeCard({ pokemon, dispatch, pokedex, multipliers }) {

  const [isPokemonChosen, setIsPokemonChosen] = React.useState(false);

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

  function handleSelect(event) {
    dispatch({ type: "name", value: event.target.value })
    setIsPokemonChosen(true);
  }
  return (
    <Wrapper>
      <Form>
        <PokemonSearch
          pokedex={pokedex}
          inputState={pokemon.displayName}
          inputHandler={handleSelect}
        />
        {isPokemonChosen &&
          <>
            <FormSection>
              <label htmlFor="atkIV">Atk IV: </label>
              <input
                id="atkIV"
                name="atkIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.atkIV}
                onChange={handleAttack}
              />
            </FormSection>
            <FormSection>
              <label htmlFor="defIV">Def IV: </label>
              <input
                id="defIV"
                name="defIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.defIV}
                onChange={handleDefense}
              />
            </FormSection>
            <FormSection>
              <label htmlFor="staIV">HP IV: </label>
              <input
                id="staIV"
                name="staIV"
                type="number"
                min="0"
                max="15"
                value={pokemon.staIV}
                onChange={handleStamina}
              />
            </FormSection>
          </>
        }
      </Form>
      <StatSection
        name={pokemon.name}
        form={pokemon.form}
        atkIV={pokemon.atkIV}
        defIV={pokemon.defIV}
        staIV={pokemon.staIV}
        pokedex={pokedex}
        multipliers={multipliers}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 50%;
  padding: 15px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormSection = styled.div`

`;



export default PokeCard;
