import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })


  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      email: user.email,
    })

  }else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password } = req.body
  
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists")

  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    phoneNumber,
    password,
  })

  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      phoneNumber: user.phoneNumber,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
});

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie('jwt', '',{
    httpOnly: true,
    expires: new Date(0)
  })

  res.status(200).json({ message: 'Logged out successfully'})
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.json({
      id: req.user._id,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      phoneNumber: req.user.phoneNumber,
      email: req.user.email,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstname = req.body.firstname || user.firstname,
    user.lastname = req.body.lastname || user.lastname
    user.email = req.body.email || user.email
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber

    if (req.body.password) {
      user.password = req.body.password
    }

    const updateUser = await user.save()

    res.json({
      id: updateUser._id,
      firstname: updateUser.firstname,
      lastname: updateUser.lastname,
      email: updateUser.email,
      phoneNumber: updateUser.phoneNumber
    })
  }
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};