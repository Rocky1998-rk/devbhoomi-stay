import {getAllUsers,getUserById,updateUser,toggleUserStatus,deleteUser,} from "../services/userService.js";


// ========================= Get All Users =========================

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });

  } catch (error) {
    console.error("Get Users Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};


// ========================= Get Single User =========================

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });

  } catch (error) {
    console.error("Get User Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};


// ========================= Update User =========================

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await updateUser(id, req.body);

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });

  } catch (error) {
    console.error("Update User Error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to update user",
    });
  }
};


// ========================= Toggle User Status =========================

export const toggleStatus = async (req, res) => {
  try {
    const user = await toggleUserStatus(req.params.id);

    res.status(200).json({
      success: true,
      message: `User ${
        user.isActive ? "activated" : "deactivated"
      } successfully`,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive
      }
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};


// ========================= Delete User =========================

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error.message);

    return res.status(404).json({
      success: false,
      message: error.message || "User not found",
    });
  }
};