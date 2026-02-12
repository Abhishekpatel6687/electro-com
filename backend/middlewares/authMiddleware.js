import jwt from "jsonwebtoken";
import { findUserById } from "../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserById(decoded.id);
    req.user = user;

    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
