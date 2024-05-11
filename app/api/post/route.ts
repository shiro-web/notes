import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prismaClient";

export async function POST(req:NextRequest) {

  const {id,userName,articleName,likeCount,eyecatch,noteUrl,nickname,userImage} = await req.json();
  const notesPost = await prisma.article.create({
    data:{
      id:id,
      userName:userName,
      articleName:articleName,
      likeCount:likeCount,
      eyecatch:eyecatch,
      noteUrl:noteUrl,
      nickname:nickname,
      userImage:userImage
    }
  });
  
 
  return NextResponse.json(notesPost)
  }

