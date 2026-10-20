# InterviewX

A mock interview practice app for core CS topics. Pick topics and a difficulty level, answer questions one by one, get a score with feedback, and track your progress over time.

**Live demo:** https://interview-x-wheat.vercel.app/

## Features

- Sign up and log in with email and password (Firebase Authentication)
- Choose one or more topics and a difficulty level (Beginner, Intermediate, Advanced)
- Topics covered: DBMS, SQL, OOPs, Operating System, Computer Networks, DSA, System Design Basics, JavaScript, React
- Answer questions one at a time and get a score with strengths and improvements
- Every interview is saved to Firestore
- Progress dashboard with a Chart.js line chart and a history of past interviews
- Firestore security rules so each user can only read and write their own data

## Tech Stack

- React, Vite
- Tailwind CSS
- React Router
- Firebase Authentication and Cloud Firestore
- Chart.js with react-chartjs-2
- Deployed on Vercel

## Current Limitations

- Questions come from a built-in question bank, not from an AI model yet
- Answer scoring is a placeholder based on answer length, not on correctness
- Resume upload accepts a PDF but does not use it to generate questions yet

## Roadmap

- Generate questions with an LLM API based on topic, level, and resume
- Evaluate answers with an LLM for real feedback on correctness
- Logout button and a consistent theme across all pages

## Run Locally

```bash
git clone https://github.com/saumyasingh19/InterviewX.git
cd InterviewX
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To use your own backend, create a Firebase project, enable Email/Password sign-in and Firestore, and put your web app config in `src/firebase.js`.

## Project Structure

```
src/
  App.jsx          Routes and landing page
  Login.jsx        Login and signup
  Dashboard.jsx    Topic and level selection
  Questions.jsx    Interview flow and feedback
  Progress.jsx     Progress chart and history
  firebase.js      Firebase setup
  utils/
    openai.js      Question bank (mock for now)
    evaluate.js    Answer evaluation (mock for now)
```

## Author

Saumya Singh