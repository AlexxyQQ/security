import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../model/user.model.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: !email ? "Please provide email!" : "Please provide password!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist!",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        type: user.type,
        profile_pic: user.profile_pic,
        email: user.email,
        verified: user.verified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );
    user.password = undefined;
    res.status(200).json({
      success: true,
      data: { user, token: token },
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginWithToken = async (_req, res) => {
  try {
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      // remove password and otp from user object
      user.password = undefined;
      user.otp = undefined;
      res.json({
        success: true,
        data: {
          user,
          token: res.locals.token,
        },
        message: "User logged in successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
