import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize SDK
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Default model
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.0-flash";


// ----------------------------------------------------------
// 🔥 CLEAN + RESILIENT JSON PARSER
// ----------------------------------------------------------
function extractJSON(text) {
  try {
    // Remove markdown formatting, backticks, etc.
    let cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .replace(/^\s*JSON:/i, "")
      .trim();

    // Try direct parsing
    return JSON.parse(cleaned);
  } catch (err1) {
    console.warn("⚠️ JSON direct parse failed. Attempting auto-fix…");

    // Try to extract JSON substring
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (err2) {
        console.warn("⚠️ JSON substring parse failed:", err2.message);
      }
    }

    // LAST RESORT: Try repairing quotes
    try {
      const repaired = cleaned
        .replace(/(\w+):/g, '"$1":') // wrap keys
        .replace(/'/g, '"');         // unify quotes

      return JSON.parse(repaired);
    } catch (err3) {
      console.warn("❌ JSON could not be repaired. Returning raw text.");
      return { rawText: text }; // fallback
    }
  }
}


// ----------------------------------------------------------
// 🔥 sendToAI — With JSON Enforcing
// ----------------------------------------------------------
export async function sendToAI(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const resp = await model.generateContent(prompt);
    const raw = resp.response.text();

    // Extract JSON robustly
    const parsed = extractJSON(raw);

    return parsed;  // always return structured JSON
  } catch (err) {
    console.error("Gemini generateContent error:", err);
    return { error: err.message };
  }
}


// ----------------------------------------------------------
// 🔥 embed() — Convert text to embeddings
// ----------------------------------------------------------
export async function embed(text) {
  try {
    const model = genAI.getGenerativeModel({ model: process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-001" });

    const resp = await model.embedContent(text);
    return resp.embedding.values;
  } catch (err) {
    console.error("Embedding error:", err);
    return [];
  }
}
