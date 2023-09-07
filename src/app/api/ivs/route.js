import { fillIVTable, getIVTables } from "@/utils/db";
import { NextResponse } from "next/server";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const res = await getIVTables(id);
  if (res.status === 200) {
    const { data } = res;
    return NextResponse.json({
      data: data,
      status: 200
    }) 
  } else {
    console.log('data has NOT ARRIVED OH NAUR!!')
    return NextResponse.json({
      status: 500,
      message: 'error retrieving iv tables'
    })
  }
}

export async function POST() {
  const res = await fillIVTable();
  if (res === 200) {
    return NextResponse.json(
      { message: 'iv table filled' },
      { status: res }
    )
  } else {
    return NextResponse.json(
      { message: 'iv table request failed' },
      { status: res }
    )
  }
}