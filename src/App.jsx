import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import Login from './Login'
import Dashboard from './Dashboard'
import Questions from './Questions'
import Progress from './Progress'


function Landing() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u))
  return () => unsubscribe()
}, [])

const handleProgressClick = () => {
  navigate('/login', { state: { redirectTo: '/progress' } })
}
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative flex flex-col items-center justify-center px-4 py-20 max-w-5xl mx-auto text-center">
        <div className="text-8xl mb-4">🎓</div>

        <h1 className="text-6xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          InterviewX
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          AI-Powered Mock Interview Platform
        </p>

        <button
          onClick={() => navigate('/login')}
          className="bg-purple-700 hover:bg-purple-500 transition-colors px-8 py-3 rounded-lg font-medium mb-14"
        >
          Start Practicing →
        </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left w-full">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="font-semibold mb-2 text-lg">🎯 Role-based Questions</h3>
            <p className="text-gray-500 text-sm">AI generates questions tailored to your target role</p>
          </div>
          <button
            onClick={handleProgressClick}
            className="bg-gray-900 border border-gray-800 hover:border-blue-500 transition-colors rounded-xl p-6 text-left cursor-pointer"
          >
            <h3 className="font-semibold mb-2 text-lg">📊 Progress Dashboard</h3>
            <p className="text-gray-500 text-sm">Track your scores and improvement over time</p>
          </button>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  )
}

export default App