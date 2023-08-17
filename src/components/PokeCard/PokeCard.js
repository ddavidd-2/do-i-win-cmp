'use client';
import React from 'react';
import { styled } from 'styled-components';
import { CornerDownRight } from 'react-feather';
import { QUERIES } from '@/constants';
import StatSection from '../StatSection';
import PokemonSearch from '../PokemonSearch';
import FormSelector from '../FormSelector';
import TypeIcon from '../TypeIcon';
import IVInput from '../IVInput';

function PokeCard({ pokemon, dispatch, stats, setStats }) {

  const [isPokemonChosen, setIsPokemonChosen] = React.useState(false);
  const [pokedexEntry, setPokedexEntry] = React.useState({});

  function setBestIVs(entry) {
    dispatch({ type: "attack", value: entry.bestIVs.atk });
    dispatch({ type: "defense", value: entry.bestIVs.def });
    dispatch({ type: "stamina", value: entry.bestIVs.sta });
  }

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

  function handleName(name, form = "Normal") {
    dispatch({ type: "name", value: name });
    dispatch({ type: "form", value: form });
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
          handleName={handleName}
          setPokedexEntry={setPokedexEntry}
          setBestIVs={setBestIVs}
        />
        {isPokemonChosen &&
        <FormSelect>
          <CornerDownRight
            color="black"
            size={14}
          />
          Form: 
          <FormSelector
            pokemon={pokemon}
            formHandler={handleForm}
            setPokedexEntry={setPokedexEntry}
            setBestIVs={setBestIVs}
          />
        </FormSelect>
        }
      </Form>
      {isPokemonChosen &&
        <CustomizationWrapper>
          <Types>
            {pokedexEntry.type.map(t => {
              return <TypeIcon key={t} type={t} />
            })}
          </Types>
          <Form>
            <IVSection>
              <div>IVs:{" "}</div>
              <IVInput
                stat={pokemon.atkIV}
                statHandler={handleAttack}
              />
              /
              <IVInput
                stat={pokemon.defIV}
                statHandler={handleDefense}
              />
              /
              <IVInput
                stat={pokemon.staIV}
                statHandler={handleStamina}
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

  @media ${QUERIES.phoneAndSmaller} {
    width: min(180px, 40%);
  }
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
  margin-top: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media ${QUERIES.phoneAndSmaller} {
    width: 110%;
    font-size: 0.9rem;
  }

`;

const IVSection = styled.div`
  display: flex;
`;

const Types = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 4px;
`;

export default PokeCard;
