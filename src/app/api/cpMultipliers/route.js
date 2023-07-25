import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from 'fs';

export async function GET(request) {
  const jsonDirectory = path.join(process.cwd(), 'data');
  const contents = await fs.readFile(jsonDirectory + '/cpm.json', 'utf8');

  return new NextResponse(contents);
}