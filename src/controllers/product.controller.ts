import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors from "../libs/types/Errors";
import ProductService from "../models/product.service";

const productService = new ProductService();

const productController: T = {};
productController.getAllProducts = async (req: Request, res: Response) => {
  try {
    console.log("getAllProducts");

    res.render("products");
  } catch (err) {
    console.log("ERORR, getAllProducts: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

productController.createNewProduct = async (req: Request, res: Response) => {
  try {
    console.log("createNewProduct");
    res.send("Done");
  } catch (err) {
    console.log("ERORR, createNewProduct: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
  } catch (err) {
    console.log("ERORR, updateChosenProduct: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default productController;
