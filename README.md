Here’s a **clean, professional, GitHub-ready README** you can use 👇

---

# 🧠 HertsCortex

**HertsCortex** is an AI-powered study companion built for students at the University of Hertfordshire.

It transforms lecture notes into clear explanations, smart summaries, mock exams, and interactive learning experiences — all grounded strictly in the student's own uploaded material.

Instead of replacing studying, HertsCortex helps students **understand faster, revise smarter, and test themselves effectively**.

---

## 🚀 What It Does

Students upload their lecture notes and HertsCortex turns them into:

- 📌 Exam-ready summaries
- 🧱 Structured concept breakdowns
- 🧒 Explain-like-I’m-5 simplifications
- 💬 Gen-Z style explanations for quick understanding
- 😏 Humorous real-world analogies
- 📝 Mock exams & MCQs
- 🎓 Theory-style questions with grading
- 🔎 Suggestions for deeper learning

All responses are generated **strictly from the uploaded lecture material** to maintain academic relevance.

---

## 🧩 AI Personas

HertsCortex adapts its teaching style depending on what the student needs:

| Mode             | Behaviour                                           |
| ---------------- | --------------------------------------------------- |
| **Summary**      | Extracts only the _must-know_ exam information      |
| **Breakdown**    | Structures complex topics into logical hierarchies  |
| **Toddler Mode** | Explains concepts like you're 5                     |
| **Gen Z Mode**   | Uses modern internet slang for fast mental mapping  |
| **Sassy Tutor**  | Uses humour & real-life analogies                   |
| **Examiner**     | Generates mock exams                                |
| **MCQ Mode**     | Rapid-fire multiple choice questions                |
| **Theory Mode**  | Asks + grades written responses                     |
| **Deep Roots**   | Suggests foundational concepts & external resources |

---

## 🛡️ Context-Aware Learning

HertsCortex uses a **strict context grounding system**:

> It only answers based on uploaded lecture notes.

If a question falls outside the material, it responds with:

```
Sorry, I can only answer questions related to the provided lecture notes.
```

This ensures:

✅ Academic relevance
✅ Reduced hallucination
✅ True course-aligned learning

---

## 🏗️ Tech Stack

### AI & Retrieval

- ⚡ Groq (LLM inference)
- 🦜 LangChain
- 🔗 LangGraph
- 🧠 HuggingFace Embeddings
- 🗂️ Chroma Vector DB

### Application

- ⚛️ Next.js (T3 Stack)
- 🛢️ NeonDB
- 🔐 Prisma ORM
- 🧑‍💻 TypeScript

---

## 🧠 Architecture Overview

1. Student uploads lecture notes
2. Notes are embedded using HuggingFace
3. Stored in Chroma vector DB
4. LangGraph orchestrates retrieval & persona prompting
5. Groq LLM generates responses
6. Output adapts to selected learning persona

---

## 🎯 Goal

HertsCortex was built to:

- Reduce cognitive overload
- Personalize revision styles
- Make difficult concepts approachable
- Encourage active recall & self-testing

It acts like:

> A professor, study influencer, kindergarten teacher, and examiner — all in one.

---

## 📌 Future Improvements

- Collaborative study groups
- Flashcard generation
- Lecture-to-mindmap conversion
- Progress tracking
- Adaptive difficulty testing

---

## 📄 License

MIT
