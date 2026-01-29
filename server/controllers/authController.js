const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Check if user is banned
    if (user.isBanned) {
      res.status(403);
      throw new Error(
        `Account is banned. Reason: ${
          user.bannedReason || "Violated terms of service"
        }`
      );
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, profilePicture, role } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePicture,
    role: role || "user",
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      loyaltyPoints: user.loyaltyPoints,
      profilePicture: user.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.profilePicture !== undefined) {
      user.profilePicture = req.body.profilePicture;
    }

    // If password is sent
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      loyaltyPoints: updatedUser.loyaltyPoints,
      profilePicture: updatedUser.profilePicture,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user watchlist
// @route   GET /api/users/watchlist
// @access  Private
const getWatchlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("watchlist");
  if (user) {
    res.json(user.watchlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Add movie to watchlist
// @route   POST /api/users/watchlist
// @access  Private
const addToWatchlist = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  const user = await User.findById(req.user._id);

  if (user) {
    if (user.watchlist.includes(movieId)) {
      res.status(400);
      throw new Error("Movie already in watchlist");
    }
    user.watchlist.push(movieId);
    await user.save();
    res.json(user.watchlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Remove movie from watchlist
// @route   DELETE /api/users/watchlist/:id
// @access  Private
const removeFromWatchlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.watchlist = user.watchlist.filter(
      (id) => id.toString() !== req.params.id
    );
    await user.save();
    res.json(user.watchlist);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.profilePicture = req.body.profilePicture || user.profilePicture;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Ban user
// @route   PUT /api/users/:id/ban
// @access  Private/Admin
const banUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.role === "admin") {
      res.status(400);
      throw new Error("Cannot ban an admin user");
    }

    user.isBanned = true;
    user.bannedAt = new Date();
    user.bannedReason = req.body.reason || "Violated terms of service";

    await user.save();

    res.json({
      message: "User banned successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBanned: user.isBanned,
        bannedReason: user.bannedReason,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Unban user
// @route   PUT /api/users/:id/unban
// @access  Private/Admin
const unbanUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isBanned = false;
    user.bannedAt = null;
    user.bannedReason = null;

    await user.save();

    res.json({
      message: "User unbanned successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isBanned: user.isBanned,
      },
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
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
};
