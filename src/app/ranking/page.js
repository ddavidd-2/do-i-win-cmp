import Search from "@/components/Search";
import pokedex from "../../../public/pokedex";

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