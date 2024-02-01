import { User } from "../../model/user.model.js";

export const singupOTPValidator = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!otp || !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide Email and OTP!",
      });
    }

    const existingUserEmail = await User.findOne({ email });

    if (existingUserEmail) {
      if (existingUserEmail.otp === otp.toString()) {
        existingUserEmail.verified = true;
        existingUserEmail.otp = null;
        await existingUserEmail.save();
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully!",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid OTP!",
        });
      }
    }

    return res.status(400).json({
      success: false,
      message: "User not found with the provided email!",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const resendVerification = async (_req, res) => {
  try {
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      if (user.verified) {
        return res.status(400).json({
          success: false,
          message: "User already verified!",
        });
      }

      const sixDigitOTP = generateOTP();

      // Send OTP to email
      await sendEmail(
        user.email, // Recipient's email address
        "Email Verification OTP for Ecommerce", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );

      // Save OTP in the database
      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { otp: sixDigitOTP } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "OTP sent to your email!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
