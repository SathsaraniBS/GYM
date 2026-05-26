import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    // ─── AI Coach — daily stats ──────────────────────────────────────────────
    stats: {
      caloriesToday:  { type: Number, default: 0 },    // kcal burned today
      streak:         { type: Number, default: 0 },    // consecutive active days
      weeklySessions: { type: Number, default: 0 },    // workouts done this week
      activeMinutes:  { type: Number, default: 0 },    // active minutes this week
      proteinToday:   { type: Number, default: 0 },    // grams of protein today
    },

    // ─── AI Coach — user goals ───────────────────────────────────────────────
    goals: {
      primary:      { type: String, default: "General fitness" },
      proteinGoal:  { type: Number, default: 180 },    // grams/day target
      calorieGoal:  { type: Number, default: 2500 },   // kcal/day target
      weeklyTarget: { type: Number, default: 5 },      // sessions/week target
    },

    // ─── AI Coach — today's workout plan ────────────────────────────────────
    todayPlan: {
      name:     { type: String, default: "Rest day" }, // e.g. "Legs & Shoulders"
      duration: { type: Number, default: 0 },          // estimated minutes
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

export default User;