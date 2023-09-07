import PokemonWrapper from "@/components/PokemonWrapper"
import BoldWrap from "@/components/BoldWrap"
import getPokedex from "@/utils/getPokedex";

export const metadata = {
  title: 'Do I Win CMP?',
  description: 'A Pokémon Go CMP Tie Calculator',
}


export default async function Home() {
  const pokedex = await getPokedex();

  return (
    <>
      <h3>A Pok&#233;mon GO CMP Calculator</h3>
      <p><BoldWrap>Do I Win CMP?</BoldWrap> is an Pok&#233;mon GO calculator that 
        determines who your Pok&#233;mon wins and loses against in terms of Charge Move Priority.</p>
      <details>
        <summary>What is Charge Move Priority &#40;CMP&#41;?</summary>
        <p>CMP occurs when both player use their Charge Move on the same turn.
          The game calculates each Pok&#233;mon&apos;s attack stat to determine which Charge Move gets priority and goes first.</p>
      </details>
      <PokemonWrapper />
    </>
  )
}
