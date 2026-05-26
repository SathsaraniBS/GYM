import express from "express";
import Anthropic from "@anthropic-ai/sdk";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";   // ✅ verifyToken → protect

const router = express.Router();
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

router.post("/chat", protect, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const systemPrompt = `You are FitTrack AI Coach, a friendly personal fitness assistant for ${user.name}.

Their current stats:
- Calories burned today: ${user.stats.caloriesToday} kcal (goal: ${user.goals.calorieGoal} kcal)
- Current streak: ${user.stats.streak} days
- Weekly sessions: ${user.stats.weeklySessions}/${user.goals.weeklyTarget}
- Active minutes this week: ${user.stats.activeMinutes} min
- Protein today: ${user.stats.proteinToday}g / ${user.goals.proteinGoal}g
- Today's workout: ${user.todayPlan.name}
- Primary fitness goal: ${user.goals.primary}

Rules:
- Be encouraging and reference their actual data
- Keep responses to 2-4 sentences
- Respond in the same language the user writes in (Sinhala or English)
- Give specific, actionable advice`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        ...conversationHistory,
        { role: "user", content: message },
      ],
    });

    res.json({ reply: response.content[0].text });

  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

export default router;