import Link from "next/link";
import path from 'path';
import { promises as fs } from 'fs';
import IVList from "@/components/IVTable";
import { Suspense } from "react";
import { getPokemonIVs } from '../../../../utils/pokeMath';

export async function generateStaticParams() {
  const pokedexPath = path.join(process.cwd(), '/public/pokedex.json');
  const data = await fs.readFile(pokedexPath, 'utf8');
  const pokedex = JSON.parse(data);
  return pokedex.map((pokemon) => ({
    name: pokemon.pokemon_name,
    form: pokemon.form
  }));
}

function getIVs(name, form) {
  const list40 = getPokemonIVs(name, form, 40);
  const list41 = getPokemonIVs(name, form, 41);
  const list50 = getPokemonIVs(name, form, 50);
  const list51 = getPokemonIVs(name, form, 51);
  return [list40, list41, list50, list51];
}


export default async function Page({ params }) {
  const name = params.pokemon;
  const form = params.form;

  const [list40, list41, list50, list51] = getIVs(name, form);
  const fallback = <div>Loading data...</div>;

  return (
    <div>
      <Link href="/ranking">Back to Home</Link>
      <p>name: {name}</p>
      <p>form: {form}</p>
      <Suspense fallback={fallback}>
        <IVList  
          list40={list40}
          list41={list41}
          list50={list50}
          list51={list51}
        />
      </Suspense>
    </div>
  )
}