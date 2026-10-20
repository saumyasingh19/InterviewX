import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const topics = [
  'DBMS',
  'SQL',
  'OOPs',
  'Operating System',
  'Computer Networks',
  'Data Structures & Algorithms',
  'Software Engineering',
  'System Design Basics',
  'JavaScript',
  'React',
]

const levels = ['Beginner', 'Intermediate', 'Advanced']

function Dashboard() {
  const [mode, setMode] = useState('topics') // 'topics' or 'resume'
  const [selectedTopics, setSelectedTopics] = useState([])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const navigate = useNavigate()

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    )
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) setResumeFile(file)
  }

  const handleStart = () => {
  if (mode === 'topics' && (selectedTopics.length === 0 || !selectedLevel)) {
    alert('Please select at least one topic and a difficulty level')
    return
  }
  if (mode === 'resume' && !resumeFile) {
    alert('Please upload your resume')
    return
  }
  navigate('/questions', { state: { topics: selectedTopics, level: selectedLevel } })
}

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col items-center px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">Set Up Your Mock Interview</h1>
      <p className="text-gray-400 mb-8">Choose topics manually, or let AI use your resume</p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-10 bg-gray-900 p-1 rounded-lg border border-gray-800">
        <button
          onClick={() => setMode('topics')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === 'topics' ? 'bg-purple-600' : 'text-gray-400'
          }`}
        >
          Select Topics
        </button>
        <button
          onClick={() => setMode('resume')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            mode === 'resume' ? 'bg-purple-600' : 'text-gray-400'
          }`}
        >
          Upload Resume
        </button>
      </div>

      <div className="w-full max-w-md">
        {mode === 'topics' ? (
          <>
            <label className="text-sm text-gray-400 mb-2 block">Topics (select one or more)</label>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => toggleTopic(topic)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm transition-colors ${
                    selectedTopics.includes(topic)
                      ? 'bg-purple-700 border-purple-500'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <label className="text-sm text-gray-400 mb-2 block">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-2 mb-10">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedLevel === level
                      ? 'bg-purple-700 border-purple-500'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="mb-10">
            <label className="text-sm text-gray-400 mb-2 block">Upload your resume (PDF)</label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-lg py-10 cursor-pointer hover:border-blue-500 transition-colors">
              <span className="text-gray-400 text-sm mb-1">
                {resumeFile ? resumeFile.name : 'Click to upload PDF'}
              </span>
              <span className="text-gray-600 text-xs">Max 5MB</span>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full bg-purple-600 hover:bg-blue-700 transition-colors py-3 rounded-lg font-medium"
        >
          Start Mock Interview →
        </button>
                <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate('/progress')}
            className="w-50 text-sm bg-purple-500 text-white-400 hover:bg-purple-500 rounded-sm"
          >
            📊 View My Progress
          </button>
        </div>
      </div>
      </div>
  )
}

export default Dashboard