import { Router } from "express";
import { login, loginWithToken } from "../controllers/auth/login.controller.js";
import {
  resendVerification,
  singupOTPValidator,
} from "../controllers/auth/otp.controller.js";
import {
  changePassword,
  sendforgotPasswordOTP,
} from "../controllers/auth/password.controller.js";
import { signup } from "../controllers/auth/signup.controller.js";
import { verifyToken } from "../controllers/auth/verify.controller.js";
import { deleteUser } from "../controllers/user.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const userRouter = Router();

userRouter.get("/token-login/", loginWithToken);

userRouter.post("/login/", login);

userRouter.post("/register/", signup);

userRouter.get("/verify/", verifyUser, verifyToken);

userRouter.post("/validate-otp/", singupOTPValidator);

userRouter.post("/resend-otp/", verifyUser, resendVerification);

userRouter.post("/change-password/", verifyUser, changePassword);

userRouter.post("/forgot-password-otp/", sendforgotPasswordOTP);

userRouter.post("/delete-user/", verifyUser, deleteUser);

export default userRouter;
