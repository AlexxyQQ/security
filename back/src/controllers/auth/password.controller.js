import { User } from "../../model/user.model.js";
import bcryptjs from "bcryptjs";
import { generateOTP } from "../../lib/utils/otp.generator.js";
import { sendEmail } from "../../lib/utils/nodemailer.js";

export const sendforgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if email is provided
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Email!" });
    }
    // Check if user exists with the same email
    const exist = await User.findOne({ email });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }
    // Generate OTP
    const sixDigitOTP = generateOTP();

    // Send OTP to email
    await sendEmail(
      email, // Recipient's email address
      "Forgot Password OTP for Rantit", // Email subject
      `The OTP for your email is ${sixDigitOTP}.`, // Plain text body
    );

    // Save OTP in the database
    np = await User.findOneAndUpdate(
      { email },
      { $set: { otp: sixDigitOTP } },
      { new: true },
    );

    res.status(200).json({
      success: true,
      message: "OTP sent to your email!",
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, new_password, confirm_new_password, otp } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide Email!" });
    }
    // Check if user exists with the same email
    const exist = await User.findOne({ email });
    if (!exist) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist!" });
    }

    // Check if new password is provided
    if (!new_password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a new password!" });
    }
    if (!confirm_new_password) {
      return res
        .status(400)
        .json({ success: false, message: "Please confirm your new password!" });
    }
    if (new_password !== confirm_new_password) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match!" });
    }
    if (exist.otp.toString() != otp.toString()) {
      return res.status(400).json({
        success: false,
        message: "Please request for OTP first!",
      });
    }
    // Update password
    const hashedPassword = await bcryptjs.hash(new_password, 12);
    exist.password = hashedPassword;
    exist.otp = undefined;
    await exist.save();

    // Send email to user that password has been changed
    await sendEmail(
      email, // Recipient's email address
      "Password Changed", // Email subject
      `Your password has been changed for the email: ${exist.email}`, // Plain text body
    );

    res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
