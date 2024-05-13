"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
// import useGetData from './hooks/useGetData.ts';
interface Row {
  id: string;
  nickname: string;
  likeCount: number;
  eyecatch: string;
  noteUrl: string;
  articleName: string;
}
export default function Home() {
  const [rakutens, setRakutens] = useState(undefined);
  const [notes, setNotes] = useState([]);
  const [users,setUsers] = useState([])
  const [counts,setCounts] = useState<number>()
  const [pages,setPages] = useState<number>()
  const [rows,setRows] = useState<Row[]>()
  const [datas,setDatas] = useState<string>()
  const [tests,setTests] = useState<string>()
  // useGetData();

useEffect(() => {
  const fetchData = async() => {
    const response = await fetch(`api/get`)
    const rankData = await response.json()
    setRows(rankData)
    console.log(rankData)
  }

  fetchData()
},[])


  return (
    <div>
      <main className="p-10">
        {/* <button onClick={handleFetchData}>フェッチ</button> */}
        <div className="m-auto w-80">
          {rows && rows.map((row,index) => (
            <div className="mb-6" key={row.id}>
              <div className="flex text-xl gap-2">
                <p>{index + 1}位</p>
                <p>{row.nickname}</p>
              </div>
              <p className="font-bold">スキ数：<span className=" text-pink-500">{row.likeCount}</span></p>
              <Link className="hover:opacity-50 duration-100" href={row.noteUrl}>
                <Image src={row.eyecatch} width={500} height={500} alt="eyecatch"/>
                <p className="font-bold">記事タイトル：{row.articleName}</p>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
