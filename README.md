# Learnly — AI Study Assistant

Learnly turns pasted study notes into an interactive flashcard deck and multiple-choice quiz. It is deliberately designed as a study workspace, not a chatbot: the client renders only validated structured data returned by the API.

## Features

- OpenRouter or Gemini-powered flashcards and four-option quizzes
- Animated, keyboard-accessible flashcards (Left/Right to navigate; Space to flip)
- One-question-at-a-time quiz, results, and retry-only-incorrect flow without another AI request
- Defensive JSON and schema validation on both server and client
- Loading, network, empty-response, malformed-output, and stale-request handling
- Dark mode and latest generated session persisted in local storage
- Responsive dashboard with accessible labels, focus states, and semantic controls

## Tech stack

React + Vite, Tailwind CSS, Node.js, Express, dotenv, Gemini, and OpenRouter-compatible API calls.

## Installation and local run

```bash
cd study-assistant
npm install
cp server/.env.example server/.env
cp client/.env.example client/.env
# Set OPENROUTER_API_KEY or GEMINI_API_KEY in server/.env
npm run dev
```

The client runs on `http://localhost:5173`; the API runs on `http://localhost:5001`.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `GEMINI_API_KEY` | `server/.env` | Google AI Studio key; never expose this to the client. |
| `GEMINI_MODEL` | `server/.env` | Optional Gemini model override; defaults to `gemini-2.0-flash`. |
| `OPENROUTER_API_KEY` | `server/.env` | OpenRouter key; selected when present. |
| `OPENROUTER_MODEL` | `server/.env` | Optional OpenRouter model; defaults to `openrouter/free`. |
| `PORT` | `server/.env` | Optional API port; defaults to `5001`. |
| `CLIENT_ORIGIN` | `server/.env` | Comma-separated allowed frontend origins. |
| `VITE_API_URL` | `client/.env` | Public URL of the deployed backend API. |

## API

`POST /api/generate`

```json
{ "notes": "Your study notes…" }
```

The response is validated before it is sent and has this shape:

```json
{ "flashcards": [{ "question": "", "answer": "" }], "quiz": [{ "question": "", "options": ["", "", "", ""], "correctAnswer": "" }] }
```

## AI usage note

The backend asks the configured provider for JSON-only output. Output is still parsed and checked server-side, then revalidated client-side; LLM output is never trusted merely because a prompt requested a format.

## Deployment

**Render:** Create a Node web service rooted at `study-assistant`, set its build command to `npm install`, start command to `npm start`, and add the server environment variables. Set `CLIENT_ORIGIN` to the deployed Vercel URL.

**Vercel:** Import the repository, set the root directory to `study-assistant/client`, build command to `npm run build`, and set `VITE_API_URL` to the Render API URL. Redeploy after setting the variable.

## Folder structure

```text
study-assistant/
├── client/src/       # components, hooks, services, utils, constants
├── server/src/       # routes, controllers, services, validation
└── README.md
```

## Known limitations

Generated content quality depends on the source notes and model availability. The free-tier provider may impose rate limits. Sessions remain in the individual browser only.

## Future improvements

User accounts and cloud sync, import/export, spaced-repetition scheduling, editable generated content, and automated API/component tests.

## Time spent

_Add final time spent here._
