"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [rakutens, setRakutens] = useState(undefined);
  const [notes, setNotes] = useState([]);
  const [users,setUsers] = useState([])
  const [counts,setCounts] = useState<number>()
  const [pages,setPages] = useState<number>()
  const [articles,setArticles] = useState<string>()
  const [datas,setDatas] = useState<string>()

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
useEffect(() => {
  const getNotes = async() => {
    
    
    for (let i = 1;i < 3 ; i++) {
      const res = await fetch(`/api/users?page=${i}`);
      const data = await res.json();
      const users = data.data.contents.map(user => user.urlname);
      const likes = data.data.contents.map(user => user.likeCount);
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
      const userArticles = []; // ユーザーごとの記事を保持する配列
      for (let j = 1; j <= allPages[i]; j++) {
        const res = await fetch(`/api?user=${allUsers[i]}&kind=note&page=${j}`);
        const data = await res.json();
        const articles = data.data.contents.map(note => (
          {
            name:note.name,
            like:note.likeCount
          }
        ));
        // 記事を追加
        userArticles.push(...articles); // ユーザーごとの記事を追加
      }
      allDatas.push({ user: allUsers[i], article: userArticles }); // ユーザーごとの記事をallDatasに追加
      
    }
    
    setArticles(allArticles);
    setDatas(allDatas)
  };

  return () => {
    getNotes();
  };
}, []);
// console.log(notes)
  console.log(users)
  console.log(pages)
  console.log(articles)
  console.log(datas)
  console.log(allPages)
  console.log(allArticles)
  console.log(allUsers)
  console.log(allDatas)


  return (
    <div>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 text-xl font-bold">
        <h1>いいね数ランキング</h1>
        {/* <button onClick={getRakuten}>rakutenボタン</button> */}
        {datas && datas.map((data) => (
        <div key={data.user}>
          <p className="text-red-700">ユーザー名：{data.user}</p>
          <div className="text-blue-400">
            {data.article && data.article.map((article, index) => (
              <div className="flex gap-4" key={index}>
                <p>記事のタイトル：{article.name}</p>
                <p className="text-red-300">いいね数：{article.like}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      </main>
    </div>
  );
}
