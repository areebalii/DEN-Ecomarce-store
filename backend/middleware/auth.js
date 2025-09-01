import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach only user id (for cart, product, etc.)
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
