import Errors, { HttpCode, Message } from "../libs/types/Errors";
import { Product, ProductInput } from "../libs/types/product";
import productModel from "../schema/product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = productModel;
  }

  /** SPA*/

  /**SSR */

  public async createNewProduct(input: ProductInput): Promise<Product> {
    try {
      console.log("INPUT:", input);
      return await this.productModel.create(input);
    } catch (err) {
      console.log("FULL MONGO ERROR", err);
      //throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
      throw err;
    }
  }
}

export default ProductService;
