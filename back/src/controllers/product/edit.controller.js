import { Product } from "../../model/product.model.js";

// Function to add a new product
export const addProduct = async (req, res) => {
  const userId = res.locals.user.id;
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;

  const data = {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    userId,
  };

  try {
    const requiredProperties = [
      "title",
      "description",
      "price",
      "discountPercentage",
      "rating",
      "stock",
      "brand",
      "category",
      "thumbnail",
      "images",
    ];
    const missingProperties = requiredProperties.filter(
      (prop) => !req.body[prop]
    );

    if (missingProperties.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide product data.",
      });
    }
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login to add a product.",
      });
    }
    const newProduct = new Product(data);
    await newProduct.save();
    res.status(200).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to remove a product by ID
export const removeProduct = async (req, res) => {
  const userId = res.locals.user.id;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide product ID",
      });
    }

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please login to remove a product",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to remove this product",
      });
    }
    
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to edit/update a product by ID
export const editProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = res.locals.user.id;

  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  } = req.body;

  const updatedProductData = {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
  };
  try {
    const requiredProperties = [
      "title",
      "description",
      "price",
      "discountPercentage",
      "rating",
      "stock",
      "brand",
      "category",
      "thumbnail",
      "images",
    ];
    const missingProperties = requiredProperties.filter(
      (prop) => !req.body[prop]
    );
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Please provide product ID",
      });
    }
    // if (!missingProperties.length > 0) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Please provide product data",
    //   });
    // }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.userId.toString() !== userId) {
      return res.status(400).json({
        success: false,
        message: "You are not authorized to edit this product",
      });
    }

    await Product.findByIdAndUpdate(productId, updatedProductData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
