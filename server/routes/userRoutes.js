const express = require("express");
const router = express.Router();
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getWatchlist,
  addToWatchlist,
  removeFromWatchlist,
  getUsers,
  deleteUser,
  updateUser,
  banUser,
  unbanUser,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);

// Specific routes MUST come before parameterized routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/watchlist")
  .get(protect, getWatchlist)
  .post(protect, addToWatchlist);
router.route("/watchlist/:id").delete(protect, removeFromWatchlist);

// Ban/Unban routes (must come before /:id)
router.route("/:id/ban").put(protect, admin, banUser);
router.route("/:id/unban").put(protect, admin, unbanUser);

// Parameterized route (:id) must come LAST
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

module.exports = router;
