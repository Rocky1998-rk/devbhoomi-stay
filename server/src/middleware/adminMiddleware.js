
const adminMiddleware = (req, res, next) => {
    
  // Check whether authenticated user exists
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  // Check user role
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }

  // User is admin, continue
  next();
};

export default adminMiddleware;