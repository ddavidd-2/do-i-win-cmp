'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/pokedex';
import { QUERIES } from '@/constants';

function PokemonSearch({ pokemon, handleName, setPokedexEntry, setBestIVs }) {

  const [search, setSearch] = React.useState('');

  function handleSelect(event) {
    handleName(event.target.value);
    const entry = pokedex.find(p => p.pokemon_name === event.target.value && p.form === "Normal");
    setPokedexEntry(entry);
    setBestIVs(entry);
  }
  
  function handleSearch(event) {
    const input = event.target.value;
    const searchValue = input.charAt(0).toUpperCase() + input.slice(1);
    setSearch(searchValue);
    if (searchValue === '') {
      return;
    }
    const newDex = pokedex.filter((p) => p.pokemon_name.startsWith(searchValue));
    if (newDex.length > 0) {
      const entry = newDex[0];
      setPokedexEntry(entry);
      setBestIVs(entry);
      handleName(entry.pokemon_name, entry.form);
    }
  }

  function resetSearch() {
    setSearch('');
  }

  return (
    <Wrapper>
      <SearchBar
        type="text"
        value={search}
        onChange={handleSearch}
        onFocus={resetSearch}
        placeholder="Search for a Pokemon"
      />
      <Select
        id="pokemon-name"
        value={pokemon.name}
        onChange={handleSelect}
      >
        <option
          value=" "
          label="Select a Pokemon"
          disabled
        />
        {pokedex.filter(p => p.form === 'Normal').map(p => {
          return (
            <option
              key={p.pokemon_name}
              value={p.pokemon_name}
            >{p.pokemon_name}</option>
          );
        })}
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 160px;
`

const SearchBar = styled.input`
  padding: 2px 4px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 10px;
  width: 95%;
  margin-bottom: 5px;
`

const Select = styled.select`
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 30px;
  padding: 2px 4px;

  &:hover {
    box-shadow: 1px 2px 4px 0px gray;
  }

  @media ${QUERIES.phoneAndSmaller} {
    font-size: 0.9rem;
    width: 100%;
  }
`;

export default PokemonSearch;
