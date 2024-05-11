"use client"
import React, { useEffect, useState } from 'react'

const page = () => {
  const [users,setUsers] = useState()
 
  useEffect(() => {
    const fetchData = async () => {
      let allUsers = []
      for (let i = 1; i < 1000; i++) {
        try {
          const res = await fetch(`/api/users?page=${i}`);
          const data = await res.json();
          const users = data.data.contents.map(user => user.urlname);
          // ユーザーデータを追加
          allUsers = [...allUsers, ...users];
        } catch (error) {
          console.error("Error fetching data:", error);
          // エラーが発生した場合は処理をスキップする
          continue;
        }
      }
      setUsers(allUsers)
    }

    fetchData()
  }, [])

  console.log(users)
  return (
    <div>
      {users && users.map((user,index) => (
        <p>{index + 1}:{user}</p>
      ))}
    </div>
  )
}

export default page