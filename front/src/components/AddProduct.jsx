import axios from "axios";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { categories } from "../lib/const";

const AddProduct = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [{ url: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const onSubmit = async (data) => {
    try {
      const images =
        data.images.length === 0
          ? ["https://images.pexels.com/photos/925683/pexels-photo-925683.jpeg"]
          : data.images.map((image) => image.url);
      const apiData = {
        title: data.title,
        description: data.description,
        price: data.price,
        discountPercentage: data.discount,
        rating: 4.25,
        stock: data.stock,
        brand: data.brand,
        category: data.category,
        thumbnail: data.thumbnail,
        images: images,
      };

      // axios post request to add product and add token to the header
      const response = await axios.post(
        "https://localhost:3001/api/product/add/",
        apiData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            apisecret: process.env.REACT_APP_APISECRET,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added successfully");
        return;
      }
      toast.success("Something went wrong. Please try again");
    } catch (error) {
      toast.error("Something went wrong on the server side");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-0">
      <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="space-y-4">
          <input
            {...register("title", { required: true })}
            placeholder="Title"
            className={`w-full p-2 border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {/* {errors.title && (
            <p className="mt-2 text-sm text-red-600">Title is required</p>
          )} */}

          <textarea
            {...register("description", { required: true })}
            placeholder="Description"
            className={`w-full p-2 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded`}
          />
          {/* {errors.description && (
            <span className="text-red-500 text-xs">
              Description is required
            </span>
          )} */}

          <div className="flex space-x-4">
            <div className="flex flex-col">
              <input
                {...register("price", { required: true })}
                placeholder="Price"
                // allow for decimal numbers
                step="0.01"
                type="number"
                className={`w-full p-2 border ${
                  errors.price ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {/* {errors.price && (
                <span className="text-red-500 text-xs">
                  Should be greater than zero
                </span>
              )} */}
            </div>
            <div className="flex flex-col">
              <input
                {...register("discount")}
                placeholder="Discount"
                step="0.01"
                type="number"
                className={`w-full p-2 border ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {/* {errors.discount && (
                <span className="text-red-500 text-xs">
                  Should be greater than zero
                </span>
              )} */}
            </div>
            <div className="flex flex-col">
              <input
                {...register("stock", { required: true })}
                placeholder="Stock"
                type="number"
                className={`w-full p-2 border ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {/* {errors.stock && (
                <span className="text-red-500 text-xs">
                  Should be greater than zero
                </span>
              )} */}
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <input
                {...register("brand", { required: true })}
                placeholder="Brand"
                className={`w-full p-2 border ${
                  errors.brand ? "border-red-500" : "border-gray-300"
                } rounded`}
              />
              {/* {errors.brand && (
                <span className="text-red-500 text-xs">Brand is required</span>
              )} */}
            </div>
            <div className="flex flex-col">
              <select
                {...register("category", { required: true })}
                id="category"
                className={`w-full p-2 border ${
                  errors.category ? "border-red-500" : "border-gray-300"
                } rounded`}
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {/* {errors.category && (
                <span className="text-red-500 text-xs">
                  Category is required
                </span>
              )} */}
            </div>
          </div>

          <div className="flex flex-col">
            <input
              {...register("thumbnail", { required: true })}
              placeholder="Thumbnail URL"
              type="url"
              className={`w-full p-2 border ${
                errors.thumbnail ? "border-red-500" : "border-gray-300"
              } rounded`}
            />
            {/* {errors.thumbnail && (
              <span className="text-red-500 text-xs">
                Thumbnail URL is required
              </span>
            )} */}
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-4">
              <input
                {...register(`images.${index}.url`, { required: true })}
                placeholder="Image URL"
                defaultValue={field.url}
                type="url"
                className={`w-full p-2 border ${
                  errors.images && errors.images[index]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded`}
              />
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </div>
          ))}

          <button type="button" onClick={() => append({ url: "" })}>
            Add Product Image
          </button>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
