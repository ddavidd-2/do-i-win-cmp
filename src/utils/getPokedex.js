export default async function getPokedex() {
  const res = await fetch('http://localhost:3000/api/pokedex');
  if (res.status !== 200) {
    return undefined;
  }
  const data = await res.json();
  return data.pkm;
}