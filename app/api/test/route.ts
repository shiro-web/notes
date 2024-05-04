import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    const res = await fetch(
      `https://note.com/api/v2/creators/info/contents?kind=note&page=100`,
    );
    const data = await res.json();
    return NextResponse.json(data);
  }

//   export function GET(req: NextRequest) {
//     const res = NextResponse.json(req)
//     return res;
// }