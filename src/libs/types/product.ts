import { ObjectId } from "mongoose";

import {
  ProductCollection,
  ProductStatus,
  ProductSize,
} from "./enum/product.enum";

export interface Product {
  _id: ObjectId;
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productNumber: number;
  productSize?: String;
  productVolume?: number;
  productDesc?: string;
  productImages?: string[];
  productViews?: number;
}

export interface ProductInput {
  productStatus?: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productNumber: number;
  productSize?: String;
  productVolume?: number;
  productDesc?: string;
  productViews?: number;
  productImages?: string[];
}
