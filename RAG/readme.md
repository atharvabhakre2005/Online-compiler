  🚀 AI Debugger – Automatic Code Fixing with Gemini 2.5 Flash + RAG + ChromaDB

  An advanced AI-powered debugging engine that analyzes source code, runtime output, and error logs — retrieves similar past issues using Vector Search (ChromaDB) — and generates:

  ✔ Root cause analysis

  ✔ Corrected code (full auto-fix)

  ✔ Step-by-step explanation

  ✔ Test cases

  ✔ Past-knowledge evidence (RAG)

  Powered by Google Gemini 2.5 Flash + text-embedding-004.

  This backend is production-ready and can plug directly into:

  A custom IDE

  Online code compiler

  VS Code extensions

  Debugging dashboards

  ✨ Features
  🔍 1. Intelligent Debugging (Auto Code Fixing)

  Send code + runtime logs → get a structured debugging JSON:

  rootCause

  correctedCode

  fix

  explanation

  steps

  testCases

  fromKnowledgeBase

  🧠 2. RAG (Retrieval Augmented Debugging)

  Uses ChromaDB to store past debugging sessions:

  Retrieves similar bugs

  Improves fix accuracy

  Includes citations in output

  ⚙️ 3. Gemini 2.5 Flash Integration

  Models used:

  gemini-2.5-flash → debugging & reasoning

  text-embedding-004 → vector embeddings

  🗂 4. Artifact Storage

  Every debug request is stored in:

  /artifacts/<uuid>.json


  Includes:

  Original request

  RAG retrieved docs

  AI response

  Corrected code

  Useful for:

  Analytics

  Regeneration

  Crash history

  Model tuning

  📦 5. Modular Code Design
  AI-Debugger/
  │── artifacts/               # Debug session history
  │── routes/
  │   └── debugger.js          # Debug API routes
  │── services/
  │   ├── geminiClient.js      # Gemini wrapper + JSON repair
  │   ├── vectorStore.js       # ChromaDB RAG interface
  │── utils/
  │   └── promptBuilder.js     # RAG + debugging prompt
  │── seedDocs.js              # Seeds ChromaDB with debugging examples
  │── server.js                # Express entry point
  │── test/                    # Buggy test scripts
  │── .env                     # API keys & config
  │── package.json
  └── README.md

  📥 Installation
  1️⃣ Clone the Repository
  git clone https://github.com/<your-username>/ai-debugger.git
  cd ai-debugger

  2️⃣ Install Dependencies
  npm install

  3️⃣ Environment Setup

  Create .env:

  GEMINI_API_KEY=YOUR_API_KEY_HERE
  GEMINI_MODEL=gemini-2.5-flash
  PORT=8080

  💽 Start ChromaDB (Vector Database)

  The debugger uses ChromaDB on port 8000.

  Option 1 — Docker (Recommended)
  docker run -p 8000:8000 chromadb/chroma

  Option 2 — Python (Local Install)
  pip install chromadb
  chroma run --host localhost --port 8000

  📥 Seed the Knowledge Base

  Seed the RAG memory with common debugging cases:

  node seedDocs.js


  Expected:

  🚀 Seeding ChromaDB...
  ✔️ Added seed doc...
  ✔️ Added seed doc...
  ...
  ✅ Seeding complete!

  ▶️ Start the Debugger Server
  node server.js


  Output:

  AI Debugger running at http://localhost:8080

  🔌 API Usage
  POST /debug/debug-compiler

  Send:

  filePath (optional)

  code (optional)

  errorLogs (recommended)

  runtimeOutput (optional)

  shouldApplyFix (true/false)

  Example Request
  {
    "language": "javascript",
    "filePath": "test/test1.js",
    "errorLogs": "ERR_INVALID_ARG_TYPE",
    "shouldApplyFix": false
  }

  Example Response
  {
    "requestId": "a1b2c3d4",
    "retrievedCount": 3,
    "fixApplied": false,
    "result": {
      "rootCause": "...",
      "correctedCode": "...",
      "fix": "...",
      "explanation": "...",
      "steps": ["..."],
      "testCases": ["..."],
      "fromKnowledgeBase": ["..."]
    }
  }

  🧪 Example Buggy Script
  test/test1.js
  import fs from "fs";

  fs.readFile(12345, "utf-8", (err, data) => {
    if (err) console.error("Error occurred:", err);
    else console.log("File content:", data);
  });


  Run it:

  node test/test1.js


  Then send the error logs to the debugger.

  🔧 Auto-Fix Mode

  Turn on:

  "shouldApplyFix": true


  This will:

  ✔ Create backup file
  ✔ Overwrite the file with AI-generated corrected code

  📦 Artifacts

  Each AI session is saved:

  /artifacts/<uuid>.json


  Useful for:

  Analytics

  RAG training

  Crash analysis

  Debug timeline

  🛡 Troubleshooting
  ❗ Gemini model not found

  Use correct name:

  gemini-2.5-flash

  ❗ ChromaDB connection refused

  Check:

  curl http://localhost:8000

  ❗ Embedding error

  Ensure model used:

  text-embedding-004

  ❗ .env not loading

  Add at top of your server files:

  import dotenv from "dotenv";
  dotenv.config();

  🤝 Contributing

  Pull requests welcome.

  Guidelines:

  Meaningful commits

  Clean modular structure

  No secrets in commits

  Add relevant test cases

  🌟 Future Enhancements (Optional)

  🔥 Web UI (React + Tailwind)

  🔥 Streaming AI responses

  🔥 Auto-run sandbox execution

  🔥 Multi-file debugging

  🔥 GitHub plugin

  🔥 Error-category-based RAG

  If you want any of these, tell me — I can generate full implementations.