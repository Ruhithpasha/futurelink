import axios from "axios";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

class AIService {
  constructor() {
    this.key = process.env.OPENROUTER_API_KEY;
    // Auto-detect if it's a Google Gemini key (starts with AIzaSy)
    this.isGoogleKey = this.key?.startsWith("AIza");
    this.genAI = this.isGoogleKey ? new GoogleGenerativeAI(this.key) : null;
  }

  async getAIResponse(prompt) {
    if (!this.key) {
      throw new Error("API Key missing. Please check your .env file.");
    }

    if (this.isGoogleKey) {
      return this.getGoogleResponse(prompt);
    } else {
      return this.getOpenRouterResponse(prompt);
    }
  }

  async getOpenRouterResponse(prompt) {
    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "google/gemini-2.0-flash-lite-001",
          messages: [{ role: "user", content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${this.key}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",
            "X-OpenRouter-Title": "MERN Flow App",
          },
        },
      );

      return (
        response.data.choices[0]?.message?.content || "No response from AI."
      );
    } catch (error) {
      console.error("OpenRouter Error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.error?.message ||
          "Failed to fetch AI response from OpenRouter",
      );
    }
  }

  async getGoogleResponse(prompt) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash-lite",
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error("Gemini Error:", error.message);
      throw new Error(
        error.message || "Failed to fetch AI response from Google Gemini",
      );
    }
  }
}

export default new AIService();
