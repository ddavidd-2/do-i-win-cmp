import { initPokedex, getAllPokemon } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST() {
  const res = await initPokedex();
  return NextResponse.json(
    { message: 'action completed...' },
    { status: res }
  );
}

export async function GET() {
  const res = await getAllPokemon();
  if (res.status === 200) {
    if (!data) {
      console.error('pkmData is null');
    }
    return NextResponse.json({ 
      status: 200,
      pkm: data
    });
  } else {
    return NextResponse.json({
      status: 500
    })
  }
}