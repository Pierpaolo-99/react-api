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

  function deletePost(postSlug) {
    fetch(`${base_api_url}${posts_endpoint}/${postSlug}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          setPosts(posts.filter(post => post.slug !== postSlug))
        } else {
          console.error('Errore nella cancellazione del post')
        }
      })
      .catch(err => console.error('Errore:', err))
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

        <section className="jumbotron">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">Welcome to My Blog</h1>
              <p className="col-md-8 fs-4">
                Discover the latest posts, news, and updates. Dive into a variety of topics and enjoy reading our curated content.
              </p>
              <button className="btn btn-primary btn-lg" type="button">
                Explore Posts
              </button>
            </div>
          </div>
        </section>

        <section className="table">
          <div className="container mt-4">
            <table className="table table-striped">
              <thead className='table-dark'>
                <tr>
                  <th>IMAGE</th>
                  <th>TITLE</th>
                  <th>CONTENT</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.slug}>
                    <td><img src={base_api_url + img_endpoint + post.image} alt={post.title} className="table-img" /></td>
                    <td><h5>{post.title}</h5></td>
                    <td className="content-cell">{post.content}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletePost(post.slug)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </main>

    </>
  )
}
