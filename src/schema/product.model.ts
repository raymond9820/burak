import {
  ProductCollection,
  ProductSize,
  ProductStatus,
  ProductVolume,
} from "../libs/types/enum/product.enum";
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    ProductStatus: {
      type: String,
      enum: ProductStatus,
      default: ProductStatus.PASUE,
    },
    ProductCollection: {
      type: String,
      enum: ProductCollection,
      required: true,
    },
    produvtName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productLeftCount: {
      type: Number,
      required: true,
    },
    ProductSize: {
      type: String,
      enum: ProductSize,
      default: ProductSize.NORMAL,
    },
    productVolume: {
      type: String,
      enum: ProductVolume,
      default: ProductVolume.ONE,
    },
    productDesck: {
      type: String,
      required: true,
    },

    productImages: {
      type: [String],
      default: [],
    },

    productViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);
productSchema.index(
  { productName: 1, productSize: 1, productVolume: 1 },
  { unique: true },
);

export default mongoose.model("Product", productSchema);
