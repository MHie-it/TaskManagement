import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from './pages/HomePage.jsx'
import TaskPage from './pages/TaskPage.jsx'
import TeamPage from './pages/TeamPage.jsx'
import UserPage from './pages/UserPage.jsx'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teams" element={<TeamPage />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/profile" element={<UserPage />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  )
}

export default App

