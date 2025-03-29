import { useState, useEffect } from 'react'

export default function App() {


  function fetchData() {

    const api_endpoint = 'http://localhost:3006/api/v1/posts'

    fetch(api_endpoint)
      .then((res) => res.json())
      .then(data => {
        console.log(data);
      })
  }


  return (
    <>
      <h1>Blog</h1>
      <button className='btn btn-dark' onClick={() => fetchData()}>
        Load Post
      </button>
    </>
  )
}
