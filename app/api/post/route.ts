import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

export async function GET(req:NextRequest) {
  const notes = await prisma.note.findMany();
  return NextResponse.json(notes)
  }

