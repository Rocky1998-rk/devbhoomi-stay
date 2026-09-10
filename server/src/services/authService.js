import User from "../models/User.js";


// ========================= Register User =========================

export const registerUser = async ({
  name,
  email,
  password,
  role,
  phone,
}) => {
  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
  });

  return user;
};


// ========================= Login User =========================

export const loginUser = async (email, password) => {

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Check account status
  if (!user.isActive) {
    throw new Error("Your account is inactive");
  }

  // Compare password
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
};