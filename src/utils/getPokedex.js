export default async function getPokedex() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/pokedex`);
  if (res.status !== 200) {
    console.error(res.message);
    return undefined;
  }
  const data = await res.json();
  return data.pkm;
}