import { shapeIntoMongooseObjectId } from "../libs/types/config";
import Errors, { HttpCode, Message } from "../libs/types/Errors";
import {
  Product,
  ProductInput,
  ProductUpdateInput,
} from "../libs/types/product";
import productModel from "../schema/product.model";

class ProductService {
  private readonly productModel;
  constructor() {
    this.productModel = productModel;
  }

  /** SPA*/

  /**SSR */
  public async getAllProducts(): Promise<Product[]> {
    const result = await this.productModel.find().exec();
    if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return result;
  }

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
  public async updateChosenProduct(
    id: string,
    input: ProductUpdateInput,
  ): Promise<Product> {
    id = shapeIntoMongooseObjectId(id);
    const result = await this.productModel
      .findOneAndUpdate({ _id: id }, input, { new: true })
      .exec();
    if (!result)
      throw new Errors(HttpCode.NOT_MODEIFIED, Message.UPDATE_FAILED);
    console.log("result:", result);
    return result;
  }
}

export default ProductService;
