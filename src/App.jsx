import { useState, useEffect } from 'react'

export default function App() {

  const base_api_url = 'http://localhost:3006'
  const posts_endpoint = '/api/v1/posts'
  const img_endpoint = '/img/posts/'

  const [posts, setPosts] = useState([])

  function fetchData(url) {

    fetch(url)
      .then((res) => res.json())
      .then(data => {
        console.log(data);

        setPosts(data)
      })
  }

  useEffect(() => {
    fetchData(base_api_url + posts_endpoint)
  }, [])


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">My Blog</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className="container mt-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post.slug}>
                  <td><img src={base_api_url + img_endpoint + post.image} alt={post.title} className="table-img" /></td>
                  <td>{post.title}</td>
                  <td className="content-cell">{post.content}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

    </>
  )
}
