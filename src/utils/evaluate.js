// Mock evaluation — answer ki length ke basis pe score deta hai
// Baad me OpenAI API se replace karenge real evaluation ke liye

export async function evaluateAnswer(question, answer) {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (!answer || answer.trim().length < 10) {
    return {
      score: 3,
      strengths: 'You attempted the question.',
      improvements: 'Your answer is too short. Try to explain with more detail, examples, or reasoning.',
    }
  }

  const length = answer.trim().length
  let score = 6
  if (length > 200) score = 9
  else if (length > 100) score = 8
  else if (length > 50) score = 7

  return {
    score,
    strengths: 'Good attempt — you covered the core idea and explained it in your own words.',
    improvements: 'Try to add a real-world example or mention edge cases to make your answer stronger in a real interview.',
  }
}