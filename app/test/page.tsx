import React from 'react'

const page = async() => {

    const response = await fetch("http://localhost:3000/api/post",{
    cache:"no-store",
  })

  const notesAllData = await response.json();
  console.log(notesAllData)
  return (
    <div>page</div>
  )
}

export default page


