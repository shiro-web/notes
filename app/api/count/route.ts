import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind");
  const user = searchParams.get("user");
  console.log(kind)
    const res = await fetch(
      `https://note.com/api/v2/creators/${user}`,
    );
    const data = await res.json();
    return NextResponse.json(data);
  }

//   export function GET(req: NextRequest) {
//     const res = NextResponse.json(req)
//     return res;
// }