import bcryptjs from "bcryptjs";
import { User } from "../../model/user.model.js";
import { sendEmail } from "../../lib/utils/nodemailer.js";
import { generateOTP } from "../../lib/utils/otp.generator.js";

export const signup = async (req, res) => {
  try {
    const { username, email, password, confirm_password, type } = req.body;
    let errorMessage = "";

    if (!username || !email || !password || !confirm_password) {
      errorMessage = "Please provide ";
      if (!username) errorMessage += "Username, ";
      if (!email) errorMessage += "Email, ";
      if (!password) errorMessage += "Password, ";
      if (!confirm_password) errorMessage += "Confirm Password, ";
      errorMessage = errorMessage.slice(0, -2) + "!";
    }

    const existingUserEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      errorMessage = "User with same USERNAME already exists!";
    } else if (existingUserEmail) {
      errorMessage = "User with same EMAIL already exists!";
    } else if (password !== confirm_password) {
      errorMessage = "Passwords do not match!";
    }

    if (errorMessage) {
      return res.status(400).json({ success: false, message: errorMessage });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    if (req.body.profile_pic) {
      const sixDigitOTP = generateOTP();
      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
        profile_pic: req.body.profile_pic,
      });
      await sendEmail(
        email, // Recipient's email address
        "OTP for Ecommerce", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );
      user = await user.save();
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profile_pic: user.profile_pic,
          verified: user.verified,
          type: user.type,
          otp: user.otp,
        },
        message: "OTP sent to your email please verify!",
      });
    } else {
      const sixDigitOTP = generateOTP();

      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
        otp: sixDigitOTP,
      });
      await sendEmail(
        email, // Recipient's email address
        "OTP for Ecommerce", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );
      user = await user.save();
      res.status(200).json({
        success: true,
        data: {
          _id: user._id,
          username: user.username,
          email: user.email,
          profile_pic: user.profile_pic,
          verified: user.verified,
          type: user.type,
        },
        message: "OTP sent to your email please verify!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
