import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

export async function GET(req:NextRequest) {
  const notes = await prisma.article.findMany();
  return NextResponse.json(notes)
  }

export async function POST(req:NextRequest) {
  const {} = req.json();
  const notesPost = await prisma.article.create({
    data:{

    }
  });
  return NextResponse.json(notes)
  }

