import express from "express";
import cors from "cors";
import fs from "fs";
import { getGeminiResponse } from "./gemini.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

// ✅ Load products.json
const products = JSON.parse(fs.readFileSync("products.json", "utf-8"));

app.post("/ask", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const geminiText = await getGeminiResponse(prompt);
    const lowerPrompt = prompt.toLowerCase();

    const matchedProducts = products.filter(p => {
      const priceMatch = (() => {
        const match = lowerPrompt.match(/under (\d+)/);
        return match ? p.price <= parseInt(match[1]) : true;
      })();

      return (
        lowerPrompt.includes(p.name.toLowerCase()) ||
        lowerPrompt.includes(p.category.toLowerCase()) ||
        priceMatch
      );
    });

    console.log("Matched products:", matchedProducts);

    res.json({
      geminiText,
      suggestions: matchedProducts,
    });
  } catch (err) {
    console.error("Gemini error:", err.message);
    res.status(500).json({ error: "Failed to generate response from Gemini" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
