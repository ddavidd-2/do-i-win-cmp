import Search from "@/components/Search";
import pokedex from "../../../public/pokedex";

export const metadata = {
  title: 'IV Rankings',
  description: 'Lookup the best IVs for an specific Pokémon'
}

export default async function Page() {
  return (
    <>
      <h3>Search IV Rankings</h3>
      <Search
        pokedex={pokedex}
      />
    </>
  );
}