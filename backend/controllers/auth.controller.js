import bcrypt from "bcryptjs";
import Judge from "../models/judge.model.js";
import generateToken from "../lib/generateToken.js";

export const register = async (req, res) => {
    try {
        const { name, judgeID, password } = req.body;
        const userExists = await Judge.findOne({ judgeID });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
        }
        if (!judgeID) {
            res.status(400).json({ message: "Missing required data" });
        }

        const newUser = new Judge({ name, judgeID });

        if (password) {
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(password, salt);
            newUser.role = "admin";
        }

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                id: newUser.judgeID,
                name: newUser.name,
                role: newUser.role,
            });
        } else {
            res.status(400).json({ message: "Invalid data" });
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration Failed" });
    }
};

export const login = async (req, res) => {
  try {
    const { name, judgeID, password } = req.body;

    const user = await Judge.findOne({ judgeID });
    if (judgeID == 0) {
      const isMatch = await bcrypt.compare(password, user?.password || "");
      if (!user || !isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    } else {
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
    }
    generateToken(user._id, res);
    res.status(200).json({
      id: user.judgeID,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login Failed" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
