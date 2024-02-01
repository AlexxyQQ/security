import { Router } from "express";

import {
  addProduct,
  editProduct,
  removeProduct,
} from "../controllers/product/edit.controller.js";
import {
  getAllProducts,
  getProductById,
} from "../controllers/product/products.controller.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const productRouter = Router();

// ROUTE: /api/items/
productRouter.get("/", getAllProducts);

productRouter.get("/:id", getProductById);

productRouter.post("/add", verifyUser, addProduct);

productRouter.put("/edit/:id", verifyUser, editProduct);

productRouter.delete("/delete/:id", verifyUser, removeProduct);

export default productRouter;
