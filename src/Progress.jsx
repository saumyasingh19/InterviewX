import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { auth, db } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

function Progress() {
  const navigate = useNavigate()
  const [interviews, setInterviews] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (!user) {
      setLoading(false)
      return
    }
    try {
      const q = query(
        collection(db, 'interviews'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'asc')
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setInterviews(data)
    } catch (err) {
      console.error('Error fetching interviews:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  })
  return () => unsubscribe()
}, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Loading your progress...</p>
      </div>
    )
  }
  if (error) {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <p className="text-red-400 mb-4">Error: {error}</p>
      {error.includes('index') && (
        <p className="text-gray-500 text-sm text-center">
          Check the browser console for a link to create the required Firestore index.
        </p>
      )}
    </div>
  )
}

  if (interviews.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <p className="text-gray-400 mb-4">No interviews yet. Complete one to see your progress here.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          Start Practicing
        </button>
      </div>
    )
  }

  const chartData = {
    labels: interviews.map((iv) =>
      iv.createdAt?.toDate ? iv.createdAt.toDate().toLocaleDateString() : ''
    ),
    datasets: [
      {
        label: 'Average Score',
        data: interviews.map((iv) => iv.avgScore),
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f6',
        tension: 0.3,
      },
    ],
  }

  const chartOptions = {
    scales: {
      y: { min: 0, max: 10, ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
      x: { ticks: { color: '#9ca3af' }, grid: { color: '#1f2937' } },
    },
    plugins: { legend: { labels: { color: '#e5e7eb' } } },
  }

  const overallAvg = interviews.reduce((sum, iv) => sum + iv.avgScore, 0) / interviews.length

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
      <p className="text-gray-400 mb-10">
        {interviews.length} interview{interviews.length > 1 ? 's' : ''} completed · Overall average: {overallAvg.toFixed(1)}/10
      </p>

      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 mb-10">
        <Line data={chartData} options={chartOptions} />
      </div>

      <div className="w-full max-w-2xl space-y-3">
        {interviews.slice().reverse().map((iv) => (
          <div key={iv.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
            <div>
              <p className="text-sm">{iv.topics?.join(', ')}</p>
              <p className="text-gray-500 text-xs">
                {iv.level} · {iv.createdAt?.toDate ? iv.createdAt.toDate().toLocaleDateString() : ''}
              </p>
            </div>
            <p className="font-semibold">{iv.avgScore.toFixed(1)}/10</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Progress