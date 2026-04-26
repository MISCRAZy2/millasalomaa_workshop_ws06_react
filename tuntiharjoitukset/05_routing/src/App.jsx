import { Routes, Route } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import PostsPage from './pages/PostsPage.jsx'
import PostDetailPage from './pages/PostDetailPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// ─── Routing overview ─────────────────────────────────────────────────────────
//
//  /             → HomePage
//  /about        → AboutPage
//  /posts        → PostsPage       (list of posts)
//  /posts/:id    → PostDetailPage  (dynamic segment — read with useParams)
//  *             → NotFoundPage    (catch-all for any unknown URL)
//
// <Routes> picks the FIRST matching <Route> and renders only that component.
// The catch-all path="*" only matches when nothing else does.

function App() {
  return (
    <div className="app">
      {/* NavBar is rendered on every page — it lives outside <Routes> */}
      <NavBar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
