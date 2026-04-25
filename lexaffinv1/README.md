# 🚀 Lexaffin — AI Legal & Financial Assistant

AI-powered platform for **legal guidance, tax insights, compliance workflows, and contract generation**.

Built for individuals, startups, and businesses that want **fast, structured, and actionable legal intelligence**—without friction.

---

## ⚡ Overview

Lexaffin is not just a chatbot.

It is designed as a **legal decision engine** that helps users:

* Understand legal and tax requirements
* Generate structured outputs (contracts, compliance steps)
* Reduce risk and improve decision-making

---

## 🧱 Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | Next.js 14 (App Router), TypeScript |
| Styling    | Tailwind CSS                        |
| AI Backend | Hugging Face Inference API          |
| Model      | Mistral-7B-Instruct (default)       |
| Deployment | Vercel                              |

---

## 🛠️ Local Development

### 1. Clone the repository

```bash
git clone https://github.com/divyansh212/lexaffin.git
cd lexaffin
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```bash
HF_API_KEY=your_api_key_here
```

> ⚠️ Never commit `.env.local` or expose real API keys.

---

### 4. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 🚀 Deployment (Vercel)

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/divyansh212/lexaffin.git
git push -u origin main
```

### 2. Import into Vercel

* Go to https://vercel.com
* Click **New Project**
* Import your repository

### 3. Configure environment variable

In Vercel → Project Settings → Environment Variables:

| Name       | Value             |
| ---------- | ----------------- |
| HF_API_KEY | your_api_key_here |

---

### 4. Deploy

Click **Deploy** — your app will be live in minutes.

---

## 📁 Project Structure

```
lexaffin/
├── app/
│   ├── page.tsx              # Landing page
│   ├── chat/page.tsx         # Chat interface
│   └── api/chat/route.ts     # AI backend endpoint
├── components/               # UI components
├── styles/                   # Global styles
├── .env.local                # Local secrets (ignored)
├── tailwind.config.ts
├── next.config.js
└── vercel.json
```

---

## 🤖 AI Configuration

Default model:

```
mistralai/Mistral-7B-Instruct-v0.3
```

To change the model, update:

```
app/api/chat/route.ts
```

---

## ✨ Features

* Structured AI responses (legal + financial focus)
* Clean, responsive UI
* Markdown-based output formatting
* Suggestion prompts for common use cases
* Fast deployment pipeline

---

## 🔒 Security Best Practices

* Never commit `.env.local`
* Never expose API keys in code or README
* Always use environment variables for secrets
* Rotate keys immediately if exposed

---

## ⚠️ Disclaimer

Lexaffin provides AI-generated legal and financial information for **informational purposes only**.

It is **not a substitute** for advice from:

* Licensed lawyers
* Chartered accountants
* Certified professionals

Always consult a qualified expert for critical decisions.

---

## 🧠 Vision

Lexaffin is evolving from:

> AI assistant → Legal execution platform

Future direction includes:

* Contract automation
* Compliance tracking
* Filing workflows
* Business formation tools

---

## 📌 Contributing

Currently in early-stage development. Contributions and feedback are welcome.

---

## 📬 Contact

For collaboration or inquiries:

* GitHub Issues
* Direct outreach (to be added)

---

## ⭐ Support

If you find this useful, consider starring the repository.
