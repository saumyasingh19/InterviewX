import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { generateQuestions } from './utils/openai'
import { evaluateAnswer } from './utils/evaluate'
import { auth, db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function Questions() {
  const location = useLocation()
  const navigate = useNavigate()
  const { topics, level } = location.state || {}

  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [evaluating, setEvaluating] = useState(false)
  const [results, setResults] = useState([])
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      const result = await generateQuestions(topics, level)
      setQuestions(result)
      setLoading(false)
    }
    fetchQuestions()
  }, [])
  useEffect(() => {
  async function saveResults() {
    if (currentIndex >= questions.length && questions.length > 0 && !saved) {
      const avgScore = results.reduce((sum, r) => sum + r.score, 0) / (results.length || 1)
      try {
        await addDoc(collection(db, 'interviews'), {
          userId: auth.currentUser?.uid,
          topics,
          level,
          results,
          avgScore,
          createdAt: serverTimestamp(),
        })
        setSaved(true)
      } catch (err) {
        console.error('Failed to save results:', err)
      }
    }
  }
  saveResults()
}, [currentIndex])

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please write an answer first')
      return
    }
    setEvaluating(true)
    const result = await evaluateAnswer(questions[currentIndex], answer)
    setFeedback(result)
    setEvaluating(false)
  }

  const handleNext = () => {
    setResults((prev) => [...prev, { question: questions[currentIndex], answer, ...feedback }])
    setAnswer('')
    setFeedback(null)
    setCurrentIndex((prev) => prev + 1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400">Generating questions with AI...</p>
      </div>
    )
  }

  if (currentIndex >= questions.length) {
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / (results.length || 1)

    return (
      <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold mb-2">Interview Complete! 🎉</h1>
        <p className="text-gray-400 mb-6">Average Score: {avgScore.toFixed(1)} / 10</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-purple-600 hover:bg-blue-700 px-6 py-2 rounded-lg"
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <p className="text-gray-500 text-sm mb-2">
        Question {currentIndex + 1} of {questions.length}
      </p>
      <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <p className="text-lg">{questions[currentIndex]}</p>
      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={6}
        disabled={!!feedback}
        className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-4 outline-none focus:border-blue-500 mb-4"
      />

      {!feedback ? (
        <button
          onClick={handleSubmitAnswer}
          disabled={evaluating}
          className="bg-purple-700 hover:bg-purple-500 transition-colors px-6 py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {evaluating ? 'Evaluating...' : 'Submit Answer'}
        </button>
      ) : (
        <div className="w-full max-w-2xl bg-gray-900 border border-gray-800 rounded-xl p-5 mb-4">
          <p className="font-semibold mb-2">Score: {feedback.score}/10</p>
          <p className="text-green-400 text-sm mb-2">✅ {feedback.strengths}</p>
          <p className="text-yellow-400 text-sm mb-4">💡 {feedback.improvements}</p>
          <button
            onClick={handleNext}
            className="bg-purple-700 hover:bg-purple-500 transition-colors px-6 py-2 rounded-lg font-medium"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  )
}

export default Questions