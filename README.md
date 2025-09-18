
# RAG Chatbot Frontend

A modern React-based frontend for a Retrieval-Augmented Generation (RAG) chatbot system. This project connects to a Fastapi backend with RAG pipeline, history management, and streaming chat features.

## Features

- **Chat UI**: React + TailwindCSS (or SCSS), with streaming bot responses, session reset, and chat history.
- **Sidebar**: Sidebar for history management.
- **API Integration**: Connects to a backend REST API for chat, session history, and reset.
- **Performance**: Designed for fast, interactive chat with in-memory caching (Redis on backend).

## Project Structure

```
frontend/
├── public/
├── src/
│   ├── api/           # API calls to backend
│   ├── components/    # UI components (Chat, Sidebar, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utilities
│   ├── pages/         # Page components (Chat, NotFound)
│   └── ...
├── package.json
├── tailwind.config.ts
├── vite.config.ts
└── ...
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or bun

### Install Dependencies
```bash
npm install
# or
bun install
```

### Run Development Server
```bash
npm run dev
# or
bun run dev
```

### Build for Production
```bash
npm run build
```


## Caching & Performance
- Session history and conversations are cached in Redis (backend)
- TTLs and cache warming can be configured in backend Redis setup (see backend README)

## RAG Pipeline (Backend)
- Ingests ~50 news articles (RSS or HTML)
- Embeds with open-source embeddings (refer backend)
- Stores in vector DB (redis)
- Retrieves top-k passages, calls Gemini API for answer


