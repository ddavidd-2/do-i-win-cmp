import ContentWrapper from "@/components/ContentWrapper"
import PokemonWrapper from "@/components/PokemonWrapper"
import BoldWrap from "@/components/BoldWrap"

export const metadata = {
  title: 'Do I Win CMP?',
  description: 'A Pokémon Go CMP Tie Calculator',
}


async function getData() {
  try {
    const pokemonRes = await fetch('http://localhost:3000/api/allPokemon', { cache: 'no-store' });
    const multipliersRes = await fetch('http://localhost:3000/api/cpMultipliers', { cache: 'no-store' });

    const pokemonData = await pokemonRes.json();
    const multipliersData = await multipliersRes.json();
    return {
      pokedex: pokemonData, 
      multipliers: multipliersData
    };
  } catch (error) {
    console.error(error);
  }

}

export default async function Home() {
  const { pokedex, multipliers } = await getData();

  return (
    <ContentWrapper>
      <h3>A Pok&#233;mon GO CMP Tie Calculator</h3>
      <p><BoldWrap>Do I Win CMP?</BoldWrap> is an open source Pok&#233;mon GO calculator that 
        determines who your Pok&#233;mon wins and loses against in CMP.</p>
      <details>
        <summary>What is Charge Move Priority &#40;CMP&#41;?</summary>
        <p>CMP occurs when both player use their Charge Move on the same turn.
          The game calculates each Pok&#233;mon's attack stat to determine which Charge Move gets priority and goes first</p>
      </details>
      <PokemonWrapper pokedex={pokedex} multipliers={multipliers} />
    </ContentWrapper>
  )
}
