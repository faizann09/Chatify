import express from "express";

const router = express.Router();

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-20b";

router.post("/", async (req, res) => {
  const message = typeof req.body.message === "string" ? req.body.message.trim() : "";

  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  // GROQ_API_KEY is the official name. GROK_API_KEY is retained temporarily
  // so existing deployments can be migrated without breaking.
  const apiKey = process.env.GROQ_API_KEY || process.env.GROK_API_KEY;

  if (!apiKey) {
    console.error("GROQ_API_KEY is not configured.");
    return res.status(503).json({
      error: "The chatbot is not configured. Add GROQ_API_KEY to the server environment.",
    });
  }

  try {
    const response = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || DEFAULT_MODEL,
        messages: [
          {
            role: "system",
            content: "You are a helpful and concise chat assistant.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const providerMessage = data?.error?.message || "Groq did not return a response.";
      console.error(`Groq API error (${response.status}): ${providerMessage}`);
      return res.status(response.status === 401 ? 503 : 502).json({
        error: "The chatbot could not respond right now.",
      });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      console.error("Groq API returned no message content.");
      return res.status(502).json({ error: "The chatbot returned an empty response." });
    }

    return res.json({ reply });
  } catch (error) {
    console.error("Groq API request failed:", error.message);
    return res.status(502).json({ error: "The chatbot could not respond right now." });
  }
});

export default router;
