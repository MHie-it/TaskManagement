import { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import TaskPage from './pages/TaskPage.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage/> */}
      <TaskPage/>
    </>
  )
}

export default App
