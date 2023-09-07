import Link from "next/link";
import IVTable from "@/components/IVTable";
import getPokedex from "@/utils/getPokedex";

export async function generateStaticParams() {
  const pokedex = await getPokedex();

  return pokedex.map((pokemon) => ({
    id: pokemon.id.toString(),
    name: pokemon.name,
    form: pokemon.form
  }));
}


async function getIVs(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/ivs?id=${id}`, { cache: 'no-store' });
  if (res.status !== 200) {
    console.error(res.message);
  }
  const { data } = await res.json();
  return data;
}


export default async function Page({ params }) {
  const { id, name, form } = params;
  const { list40, list41, list50, list51 } = await getIVs(id);

  return (
    <>
      <Link href="/ranking">Back to Home</Link>
      <div>{id}</div>
      <p>name: {name}</p>
      <p>form: {form}</p>
      <IVTable
        list40={list40}
        list41={list41}
        list50={list50}
        list51={list51}
      />
    </>
  )
}