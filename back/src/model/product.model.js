import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please enter product name"],
  },
  description: {
    type: String,
    required: [true, "Please enter product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
  },
  discountPercentage: {
    type: Number,
    validate: {
      validator: (value) => {
        return value > 0 && value < 100;
      },
      message: "Should be greater than 0 and less than 100.",
    },
  },

  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  stock: {
    type: Number,
    min: 0,
    required: [true, "Please enter product stock"],
  },
  brand: {
    type: String,
    required: [true, "Please enter product brand"],
  },
  category: {
    type: String,
    required: [true, "Please enter product category"],
  },
  thumbnail: {
    type: String,
    required: [true, "Please enter valid thumbnail"],
  },
  images: {
    type: [String],
    required: [true, "Please enter valid images"],
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: [true, "Please enter valid user id"],
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Product = mongoose.model("Products", productSchema);
