import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", protect, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    // ✅ id හෝ _id දෙකම handle කරනවා
    const userId = req.user.id || req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      console.error("User not found for id:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ stats/goals/todayPlan null safety
    const stats     = user.stats     || {};
    const goals     = user.goals     || {};
    const todayPlan = user.todayPlan || {};

    const systemPrompt = `You are FitTrack AI Coach, a friendly personal fitness assistant for ${user.name}.

Their current stats:
- Calories burned today: ${stats.caloriesToday   ?? 0} kcal (goal: ${goals.calorieGoal  ?? 2500} kcal)
- Current streak: ${stats.streak         ?? 0} days
- Weekly sessions: ${stats.weeklySessions ?? 0}/${goals.weeklyTarget ?? 5}
- Active minutes this week: ${stats.activeMinutes ?? 0} min
- Protein today: ${stats.proteinToday    ?? 0}g / ${goals.proteinGoal ?? 180}g
- Today's workout: ${todayPlan.name      ?? "Rest day"}
- Primary fitness goal: ${goals.primary  ?? "General fitness"}

Rules:
- Be encouraging and reference their actual data
- Keep responses to 2-4 sentences
- Respond in the same language the user writes in (Sinhala or English)
- Give specific, actionable advice`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemPrompt,
    });

    // ✅ conversation history Gemini format ෙකට convert කරනවා
    const history = conversationHistory.slice(0, -1).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const chat   = model.startChat({ history });
    const result = await chat.sendMessage(message);
    const reply  = result.response.text();

    res.json({ reply });

  } catch (error) {
    console.error("AI chat error:", error.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

export default router;