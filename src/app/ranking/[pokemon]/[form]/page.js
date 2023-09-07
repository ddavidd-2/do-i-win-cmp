import path from 'path';
import { promises as fs } from 'fs';
import IVList from "@/components/IVTable";

export async function generateStaticParams() {
  const pokedexPath = path.join(process.cwd(), '/public/pokedex.json');
  const data = await fs.readFile(pokedexPath, 'utf8');
  const pokedex = JSON.parse(data);
  return pokedex.map((pokemon) => ({
    name: pokemon.pokemon_name,
    form: pokemon.form
  }));
}

export default async function Page({ params }) {
  const name = params.pokemon;
  const form = params.form;

  return (
    <IVList
      name={name}
      form={form}
    />
  )
}