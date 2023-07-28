'use client';
import React from 'react';
import { styled } from 'styled-components';
import StatSection from '../StatSection';
import PokemonSearch from '../PokemonSearch';
import FormSelector from '../FormSelector';
import { CornerDownRight } from 'react-feather';

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
          pokemon={pokemon}
          inputHandler={handleName}
          setPokedexEntry={setPokedexEntry}
        />
        {isPokemonChosen &&
        <FormSelect>
          <CornerDownRight
            color="black"
            size={14}
          />
          <FormSelector
            pokemon={pokemon}
            formHandler={handleForm}
            setPokedexEntry={setPokedexEntry}
          />
        </FormSelect>
        }
      </Form>
      {isPokemonChosen &&
        <CustomizationWrapper>
          <Form>
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
          </Form>
          <StatSection
            pokemon={pokemon}
            stats={stats}
            entry={pokedexEntry}
            setStats={setStats}
          />
        </CustomizationWrapper>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FormSelect = styled.div`
  padding-left: 10px;
`

const CustomizationWrapper = styled.div`
  background-color: var(--color-primary-white);
  border-radius: 15px;
  margin-top: 30px;
  padding: 8px;
  width: 180px;
`;

const IVSection = styled.div`
  display: flex;
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
