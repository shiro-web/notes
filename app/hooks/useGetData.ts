"use client";


import { useEffect, useState } from "react";

export default function Home() {
  const [users,setUsers] = useState<string[]>([])
  const [pages,setPages] = useState<number[]>([])
  const [articles,setArticles] = useState<string[]>()

  interface Note {
    id: string;
    name: string;
    likeCount: number;
    eyecatch: string;
    noteUrl: string;
    user: {
      nickname: string;
      userProfileImagePath: string;
    };
  }

  interface Article {
    id: any;
    userName: any; 
    articleName: any; 
    likeCount: any; 
    eyecatch: any; 
    noteUrl: any; 
    nickname: any; 
    userImage: any; 
  }
  
  
useEffect(() => {
  const fetchData = async() => {
    try {
    let allArticles = [];
    let allUsers:string[] = [];
    let allPages:number[] = [];
      
    for (let i = 1;i < 1000 ; i++) {
      const res = await fetch(`/api/users?page=${i}`);
      const data = await res.json();
      const users = data.data.contents.map((user: { urlname: string; }) => user.urlname);
      // ユーザーデータを追加
      allUsers = [...allUsers, ...users];
      
    }
  
    setUsers(allUsers);
  
    for (let i = 0 ; i < allUsers.length; i++) {
      const res2 = await fetch(`/api/count?user=${allUsers[i]}`);
      const data2 = await res2.json();
      const counts = data2.data.noteCount; 
      const pages = Math.ceil(counts / 6); 
      allPages.push(pages)
    }
   
  
    setPages(allPages);
    
    for (let i = 0; i < allUsers.length; i++) {
      for (let j = 1; j <= Math.min(101, allPages[i]); j++) {
        const res = await fetch(`/api?user=${allUsers[i]}&kind=note&page=${j}`);
        const data = await res.json();
        const articles = data.data.contents.map((note:Note) => ({
          id: note.id,
          userName: allUsers[i],
          articleName: note.name,
          likeCount: note.likeCount,
          eyecatch: note.eyecatch,
          noteUrl : note.noteUrl,
          nickname : note.user.nickname,
          userImage : note.user.userProfileImagePath
        }));
        allArticles.push(...articles);
        if (allArticles.length % 1000 === 0) {
          await delay(15000);
        }
      }
      

    }
          // いいね数で降順に並べ替え
        const sortedArticles = allArticles.sort((a, b) => b.likeCount - a.likeCount).slice(0, 101);
        for (const article of sortedArticles) {
          await saveToDatabase(article);
        }
        // ステートにセット
        setArticles(sortedArticles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    // ステートにセット
  };
  fetchData();
}, []);
const delay = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms));
const saveToDatabase = async(article:Article) => {
  
  try {
    await fetch ("http://localhost:3000/api/post",{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: article.id,
        userName: article.userName,
        articleName: article.articleName,
        likeCount: article.likeCount,
        eyecatch: article.eyecatch,
        noteUrl: article.noteUrl,
        nickname: article.nickname,
        userImage: article.userImage
      })
    });
    console.log(`記事 ${article.articleName} ${article.userName}(いいね数:${article.likeCount}) がデータベースに保存されました`);
  } catch(error) {
    console.error(`記事 ${article.articleName} の保存中にエラーが発生しました:`, error);
  }
}
// const handleFetchData = async () => {
//   console.log(articles)
//   // データベースに記事を保存
//   if (articles && articles.length > 0) {
//   articles.forEach(async (article) => {
//     await saveToDatabase(article);
//   });
// };
// };
}