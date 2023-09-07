import Search from "@/components/Search";
import getPokedex from "@/utils/getPokedex";


export default async function Page() {
  const pokedex = await getPokedex();

  return (
    <>
      <h3>Search IV Rankings</h3>
      <Search
        pokedex={pokedex}
      />
    </>
  );
}