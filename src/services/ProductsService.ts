import Facade from "../data/Facade";
import ProductDTO from "../domain/dto/ProductDTO";
import UpdateProductDTO from "../domain/dto/UpdateProductDTO";
import Product from "../domain/models/Product";
import ServiceResponse from "../domain/models/ServiceResponse";
import { treatError } from "../utils/ServiceUtils";

class ProductsService {
  async fetch() {
    const result: ServiceResponse<Product[]> = {};

    try {
      const response = await new Facade().findAllProducts();

      if (response.data !== undefined) {
        result.data = response.data as Product[];
      } else {
        throw new Error(response.message as string);
      }
    } catch (e) {
      result.error = treatError(e);
    }

    return result;
  }

  async add(dto: ProductDTO) {
    const result: ServiceResponse = {};

    try {
      result.data = await new Facade().addProduct(dto);
    } catch (e) {
      result.error = treatError(e);
    }

    return result;
  }

  async update(dto: UpdateProductDTO) {
    const result: ServiceResponse = {};

    try {
      result.data = await new Facade().updateProduct(dto);
    } catch (e) {
      result.error = treatError(e);
    }

    return result;
  }

  async delete(id: number) {
    const result: ServiceResponse = {};

    try {
      result.data = await new Facade().deleteProduct(id);
    } catch (e) {
      result.error = treatError(e);
    }

    return result;
  }
}

export default ProductsService;
