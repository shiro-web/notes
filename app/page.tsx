"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import prisma from "./lib/prismaClient"

export default function Home() {
  const [rakutens, setRakutens] = useState(undefined);
  const [notes, setNotes] = useState([]);
  const [users,setUsers] = useState([])
  const [counts,setCounts] = useState<number>()
  const [pages,setPages] = useState<number>()
  const [articles,setArticles] = useState<string>()
  const [datas,setDatas] = useState<string>()
  const [tests,setTests] = useState<string>()
  
  // const getRakuten = async() => {
  //   const res = await fetch("/api/");
  //   const data = await res.json();
  //   setRakutens(data.contents)
  // }

  // console.log(rakutens)
  let allDatas = []
let allArticles = [];
let allUsers = [];
let allPages = [];
// useEffect(() => {
//   const getNotes = async() => {
    
    
//     for (let i = 1;i < 3 ; i++) {
//       const res = await fetch(`/api/users?page=${i}`);
//       const data = await res.json();
//       const users = data.data.contents.map(user => user.urlname);
//       // ユーザーデータを追加
//       allUsers = [...allUsers, ...users];
      
//     }
 
//     setUsers(allUsers);

//     for (let i = 0 ; i < 2; i++) {
//       const res2 = await fetch(`/api/count?user=${allUsers[i]}`);
//       const data2 = await res2.json();
//       const counts = data2.data.noteCount;
     
//       const pages = Math.ceil(counts / 6); 
//       allPages.push(pages)
  
   
//     }
   

//     setPages(allPages);
    
//     for (let i = 0; i < allUsers.length; i++) {
//       for (let j = 1; j <= allPages[i]; j++) {
//         const res = await fetch(`/api?user=${allUsers[i]}&kind=note&page=${j}`);
//         const data = await res.json();
//         const articles = data.data.contents.map(note => ({
//           user: allUsers[i],
//           name: note.name,
//           like: note.likeCount,
//           link: note.link_url,
//           eyecatch: note.eyecatch,
//           noteUrl : note.noteUrl,
//           nickname : note.user.nickname,
//           userImage : note.user.userProfileImagePath
//         }));
//         allArticles.push(...articles);
//       }
 
      
//     }
//         // いいね数で降順に並べ替え
//         const sortedArticles = allArticles.sort((a, b) => b.like - a.like);

//         // ステートにセット
//         setArticles(sortedArticles);

//     // ステートにセット
    
//   };

//   return () => {
//     getNotes();
//   };
// }, []);

const fetchData = async() => {
  const getNotes = async() => {
    
    
    for (let i = 1;i < 3 ; i++) {
      const res = await fetch(`/api/users?page=${i}`);
      const data = await res.json();
      const users = data.data.contents.map(user => user.urlname);
      // ユーザーデータを追加
      allUsers = [...allUsers, ...users];
      
    }
 
    setUsers(allUsers);

    for (let i = 0 ; i < 2; i++) {
      const res2 = await fetch(`/api/count?user=${allUsers[i]}`);
      const data2 = await res2.json();
      const counts = data2.data.noteCount;
     
      const pages = Math.ceil(counts / 6); 
      allPages.push(pages)
  
   
    }
   

    setPages(allPages);
    
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 1; j <= allPages[i]; j++) {
        const res = await fetch(`/api?user=${allUsers[i]}&kind=note&page=${j}`);
        const data = await res.json();
        const articles = data.data.contents.map(note => ({
          id: note.id,
          user: allUsers[i],
          name: note.name,
          like: note.likeCount,
          link: note.link_url,
          eyecatch: note.eyecatch,
          noteUrl : note.noteUrl,
          nickname : note.user.nickname,
          userImage : note.user.userProfileImagePath
        }));
        allArticles.push(...articles);
      }
 
      
    }
        // いいね数で降順に並べ替え
        const sortedArticles = allArticles.sort((a, b) => b.like - a.like);

        // ステートにセット
        setArticles(sortedArticles);

    // ステートにセット
    
  };
  getNotes()
  const {user,name,like,link,eyecatch,noteUrl,nickname,userImage} = articles

  try{
    await fetch ("http://localhost:3001/api/post"),{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user,name,like,link,eyecatch,noteUrl,nickname,userImage})
    }
  }catch{

  }
}

// console.log(notes)
//   console.log(users)
//   console.log(pages)
//   console.log(articles)
//   console.log(datas)
//   console.log(allPages)
//   console.log(allArticles)
//   console.log(allUsers)
//   console.log(allDatas)


  return (
    <div>
      <main className="p-10">
        <button onClick={fetchData}>フェッチ</button>
        <h1 className="text-xl font-bold mb-4">いいね数ランキング</h1>
        <ol className="lining-nums">
        {articles && articles.map((article) => (   
        <li key={article.id}  className="mb-2 p-4 bg-blue-50">
          <Link href={""} className="text-blue-600">ユーザー名：{article.nickname}</Link>
          <div className="">
            <Link href={article.noteUrl}>記事のタイトル：{article.name}</Link>
            <p className="text-red-300">いいね数：<span className="font-bold">{article.like}</span></p>
          </div>
          {article.eyecatch && (
          <Link href={article.noteUrl}>
            <Image src={article.eyecatch} width={400} height={400} alt="eyecatch"/>
          </Link>)}                    
        </li>
      ))}
        </ol>
      </main>
    </div>
  );
}
