import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar.jsx'
import NotesPage from './pages/NotesPage.jsx'
import NoteDetailPage from './pages/NoteDetailPage.jsx'
import NewNotePage from './pages/NewNotePage.jsx'
import EditNotePage from './pages/EditNotePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

// Route map:
//   /               → redirect to /notes
//   /notes          → list all notes   (GET /api/notes)
//   /notes/new      → create form      (POST /api/notes)
//   /notes/:id      → view + delete    (GET + DELETE /api/notes/:id)
//   /notes/:id/edit → edit form        (GET + PUT /api/notes/:id)
//   *               → 404

function App() {
  return (
    <div className="app">
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/notes" replace />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/notes/new" element={<NewNotePage />} />
          <Route path="/notes/:id" element={<NoteDetailPage />} />
          <Route path="/notes/:id/edit" element={<EditNotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
