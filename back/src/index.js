import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import productRouter from "./routes/product.router.js";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/user.router.js";
import { verifyAPIReq } from "./middleware/auth.middleware.js";
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Parse JSON bodies for API requests and limit the body size to 10mb
app.use(bodyParser.json({ limit: "10mb" }));

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// This middleware is always called
app.use(verifyAPIReq);

// All API routes
app.use("/api/product", productRouter);
app.use("/api/auth", userRouter);

app.listen(PORT, () => {
  console.log(`SERVER: Running on port http://localhost:${PORT}`);
});
