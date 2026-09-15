import { Request, Response } from "express";
import { T } from "../libs/types/common";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import ProductService from "../models/product.service";
import { ProductInput } from "../libs/types/product";
import { Adminrequest } from "../libs/types/member";

const productService = new ProductService();
const productController: T = {};

//BSSR
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

productController.createNewProduct = async (
  req: Adminrequest,
  res: Response,
) => {
  try {
    console.log("createNewProduct");
    console.log("req.files", req.files);
    if (!req.files?.length)
      throw new Errors(HttpCode.INTERNAL_SERVER_ERROR, Message.CREATE_FAILED);

    const data: ProductInput = req.body;
    data.productImages = req.files?.map((ele) => {
      return ele.path.replace(/\\/g, "/");
    });
    console.log("FINAL DATA:", data);
    await productService.createNewProduct(data);

    res.send(
      `<script>alert(${"Sucessfuly created!"}); window.location.replace('/admin/login')</script>`,
    );
  } catch (err) {
    console.log("ERORR, createNewProduct: ", err);
    const message =
      err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;

    res.send(
      `<script>alert("${message}"); window.location.replace('/admin/product/all')</script>`,
    );
  }
};

productController.updateChosenProduct = async (req: Request, res: Response) => {
  try {
    console.log("updateChosenProduct");
    const id = req.params.id as string;

    const result = await productService.updateChosenProduct(id, req.body);

    res.status(HttpCode.OK).json({ data: result });
  } catch (err) {
    console.log("ERORR, updateChosenProduct: ", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status(Errors.standart.code).json(Errors.standart);
  }
};

export default productController;
