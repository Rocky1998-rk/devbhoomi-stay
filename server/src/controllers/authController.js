import { registerUser, loginUser } from "../services/authService.js";
import generateToken from "../utils/generateToken.js";

// ========================= Register =========================

export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const user = await registerUser({
      name,
      email,
      password,
      role,
      phone,
    });

    const userResponse = user.toObject();

    delete userResponse.password;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userResponse,
    });

  } catch (error) {
    console.error("Register Error:", error.message);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


// ========================= Login =========================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Login through service
    const user = await loginUser(email, password);

    // Generate JWT
    const token = generateToken(user);

    // Remove password
    const userResponse = user.toObject();

    delete userResponse.password;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });

  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message || "Invalid email or password",
    });
  }
};