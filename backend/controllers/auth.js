import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieConfig from "../config/cookieConfig.js";

export const register = async (req, res) => {
  try {
    const { email, password, username, firstName, lastName } = req.body;

    let user = await User.findOne({ email }).select('-password');
    if (user) {
      return res.status(400).json({
        Success: false,
        message: "User already registered",
        data: user,
      });
    }

    user = await User.create({
      email,
      password,
      username,
      firstName,
      lastName,
    });

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("authToken", authToken, cookieConfig);

    res.status(201).json({
      Success: true,
      message: "User registered",
      data: user,
    });
  } catch (error) {
    res.status(500).jason({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        Success: false,
        message: "Invalid Credentials",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        Success: true,
        message: "Invalid Credentials",
        data: null,
      });
    }

    const payload = {
      userId: user._id,
      role: user.role,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.cookie("authToken", authToken, cookieConfig);

    res.status(201).json({
      Success: true,
      message: "User registered",
      data: user
    });
  } catch (error) {
    res.status(500).json({
        Success: false,
        message: error.message,
        data: null
    })
  }
};



export const logout = async (req, res) => {
    try {
        res.clearCookie("authToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict'
        })

        res.status(200).json({
            Success: true,
            message: "Logout successful",
            data: null
        })
    } catch (error) {
        res.status(500).json({
            Success: false,
            message: error.message,
            data: null
        })
    }
}
