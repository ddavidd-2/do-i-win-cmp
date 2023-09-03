'use client';
import React from 'react';
import { styled } from 'styled-components';
import pokedex from '../../../public/pokedex.json';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* todo: focus trap */

function Search() {
  const router = useRouter();
  const [searchInput, setSearchInput] = React.useState('');

  const searchResults = pokedex.filter((p) => p.pokemon_name.startsWith(searchInput));

  function handleSearch(event) {
    const input = event.target.value;
    const searchValue = input.charAt(0).toUpperCase() + input.slice(1);
    setSearchInput(searchValue);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (searchResults.length > 0) {
      const { pokemon_name, form } = searchResults[0];
      router.push(`/ranking/${pokemon_name}/${form}`);
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <SearchBar
          type="text"
          placeholder="Search by Name / No."
          value={searchInput}
          onChange={handleSearch}
        />
        <SearchButton
          type="submit"
          value="GO" 
        />
      </Form>
      {searchInput &&
       <SearchResults>
          {searchResults.slice(0, 10)
            .map((pkm) => {
              let display = pkm.pokemon_name;
              if (pkm.form !== "Normal") {
                display += ` (${pkm.form})`;
              }
              const label = `#${pkm.pokemon_id} ${display}`

              return (
                <Result
                  key={display}
                  href={`/ranking/${pkm.pokemon_name}/${pkm.form}`}
                >
                  {label}  
                </Result>
              )
            })
          }
        </SearchResults>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`

`

const Form = styled.form`

`

const SearchButton = styled.input`
  height: 100%;
  font-size: 1.1rem;
  padding: 3px;
  background-color: var(--color-win);
  border: 1px solid black;
`

const SearchBar = styled.input`
  font-size: 1.1rem;
  border: none;
  background-color: white;
  padding: 4px 8px;

  &:hover, &:focus {
    background-color: var(--color-primary-white);
  }
`

const SearchResults = styled.div`
`

const Result = styled(Link)`
  display: flex;
  background-color: white;
  height: 24px;
  padding: 2px 0;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--color-primary-white);
  justify-content: center;
  align-items: center;

  &:hover, &:focus {
    background-color: var(--color-primary-white);
  }
`

export default Search;
