import User from "../models/User.js";



//================================== Get all users =====================================
export const getAllUsers = async () => {
  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 });

  return users;
};



//================================== Get user by ID =====================================

export const getUserById = async (userId) => {
  const user = await User.findById(userId)
    .select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


//============================ Update user ======================================

export const updateUser = async (userId, updateData) => {
  const allowedFields = [
    "name",
    "phone",
    "role",
    "isActive",
  ];

  const filteredData = {};

  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


//================================== Activate / Deactivate user =====================================

export const toggleUserStatus = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  user.isActive = !user.isActive;

  await user.save();

  const userResponse = user.toObject();

  delete userResponse.password;

  return userResponse;
};


//================================== Delete user =====================================

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};