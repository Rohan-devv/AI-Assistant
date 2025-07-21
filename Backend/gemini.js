import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // ✅ Don't change model name

export async function getGeminiResponse(prompt) {
  try {
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();
    return text;
  } catch (err) {
    console.error("❌ Gemini API ERROR:", err);
    throw err;
  }
}
