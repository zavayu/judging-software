import jwt from "jsonwebtoken"
import Judge from "../models/judge.model.js"

export const protectRoute = async (req,res,next) => {
  try {
    const token = req.cookies.jwt

    if (!token) {
      return res.status(401).json({message: "Unauthorized - No Token Provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(401).json({message: "Unauthorized - Invalid Token"});
    }

    const user = await Judge.findById(decoded.id);

    if (!user) {
      return res.status(404).json({message: "User Not Found"});
    }

    req.user = user;
    next();

  } catch (error) {
    console.log("Error in protectRoute middlewear", error.message);
    return res.status(500).json({message: "Internal Server Error"});
  }
}