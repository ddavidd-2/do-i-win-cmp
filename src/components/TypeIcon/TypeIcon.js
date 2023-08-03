'use client';
import { styled } from "styled-components";

const TYPE_STYLES = {
  "Bug": {
    '--main': 'hsl(66deg, 83%, 32%)',
    '--secondary': 'hsl(66deg, 71%, 42%)',
  },
  "Dark": {
    '--main': 'hsl(24deg, 26%, 19%)',
    '--secondary': 'hsl(24deg, 24%, 28%)',
  },
  "Dragon": {
    '--main': 'hsl(252deg, 47%, 40%)',
    '--secondary': 'hsl(252deg, 71%, 76%)',
  },
  "Electric": {
    '--main': 'hsl(38deg, 98%, 46%)',
    '--secondary': 'hsl(43deg, 98%, 66%)',
  },
  "Fairy": {
    '--main': 'hsl(300deg, 57%, 72%)',
    '--secondary': 'hsl(300deg, 81%, 88%)',
  },
  "Fighting": {
    '--main': 'hsl(14deg, 69%, 20%)',
    '--secondary': 'hsl(14deg, 31%, 49%)',
  },
  "Fire": {
    '--main': 'hsl(10deg, 100%, 39%)',
    '--secondary': 'hsl(14deg, 91%, 75%)',
  },
  "Flying": {
    '--main': 'hsl(229deg, 58%, 60%)',
    '--secondary': 'hsl(230deg, 87%, 91%)',
  },
  "Ghost": {
    '--main': 'hsl(240deg, 36%, 42%)',
    '--secondary': 'hsl(240deg, 35%, 62%)',
  },
  "Grass": {
    '--main': 'hsl(99deg, 91%, 23%)',
    '--secondary': 'hsl(92deg, 45%, 79%)',
  },
  "Ground": {
    '--main': 'hsl(44deg, 54%, 39%)',
    '--secondary': 'hsl(44deg, 48%, 82%)',
  },
  "Ice": {
    '--main': 'hsl(195deg, 87%, 69%)',
    '--secondary': 'hsl(198deg, 43%, 89%)',
  },
  "Normal": {
    '--main': 'hsl(42deg, 7%, 45%)',
    '--secondary': 'hsl(33deg, 12%, 82%)',
  },
  "Poison": {
    '--main': 'hsl(297deg, 50%, 22%)',
    '--secondary': 'hsl(300deg, 28%, 76%)',
  },
  "Psychic": {
    '--main': 'hsl(342deg, 71%, 53%)',
    '--secondary': 'hsl(340deg, 45%, 82%)',
  },
  "Rock": {
    '--main': 'hsl(45deg, 44%, 43%)',
    '--secondary': 'hsl(45deg, 43%, 72%)',
  },
  "Steel": {
    '--main': 'hsl(240deg, 8%, 59%)',
    '--secondary': 'hsl(240deg, 10%, 84%)',
  },
  "Water": {
    '--main': 'hsl(210deg, 88%, 40%)',
    '--secondary': 'hsl(210deg, 100%, 76%)',
  }
}

function PokemonType({ type }) {
  const styles = TYPE_STYLES[type];

  return (
    <TypeWrapper style={styles}>{type.toUpperCase()}</TypeWrapper>
  );
}

const TypeWrapper = styled.div`
  border: 1px solid var(--color-gray-20);  
  font-size: var(--font-small);
  font-weight: bold;
  color: white;
  background: linear-gradient(
    var(--secondary) 10%, 
    var(--main) 35%,
    var(--main) 65%,
    var(--secondary) 90%
  );
  width: 64px;
  display: flex;
  justify-content: center;
  //-webkit-text-stroke: 0.4px black;
  text-shadow: 0 0 3px black;
`;

export default PokemonType;
