import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { userName, firstName, lastName, email, password } = req.body;

  const userExists =
    (await User.findOne({ email: email })) ||
    (await User.findOne({ userNameLower: userName.toLowerCase() }));

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const name = `${firstName} ${lastName}`;

  const user = await User.create({
    userName,
    name,
    email: email.toLowerCase(),
    password,
    userNameLower: userName.toLowerCase(),
    followedBy: [],
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;
  let user;

  if (
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      userName.toLowerCase()
    )
  ) {
    user = await User.findOne({ email: userName.toLowerCase() });
  } else {
    user = await User.findOne({ userNameLower: userName.toLowerCase() });
  }

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      userName: user.userName,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Get Users Username
//@route GET /api/users/:id/username
//@access Public
const getUsername = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    res.json(user.userName);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Get user by ID
//@route GET /api/users/:id
//@access Public
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select({
    userName: 1,
    name: 1,
    isAdmin: 1,
    followedBy: 1,
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get user profile
//@route GET /api/users/
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user follow list - add follower
//@route PUT /api/users/:id/addfollower
//@access Private
const addUserFollower = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    let tempFollowers = [...user.followedBy, req.user._id];
    user.followedBy = tempFollowers;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Update user follow list - remove follower
//@route PUT /api/users/:id/removefollow
//@access Private
const removeUserFollower = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    let tempFollowers = [...user.followedBy];
    let index = tempFollowers.indexOf(req.user._id);
    tempFollowers.splice(index, 1);
    user.followedBy = tempFollowers;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Fetch followed users
//@route GET /api/users/followed
//@access Private
const getFollowedUsers = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const count = await User.countDocuments({ followedBy: req.user._id });
  const users = await User.find({ followedBy: req.user._id })
    .select({
      userName: 1,
      name: 1,
      isAdmin: 1,
      followedBy: 1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

export {
  registerUser,
  authUser,
  getUsername,
  getUserById,
  getUserProfile,
  addUserFollower,
  removeUserFollower,
  getFollowedUsers,
};
