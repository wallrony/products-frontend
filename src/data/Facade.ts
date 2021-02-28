import ProductDTO from "../domain/dto/ProductDTO";
import UpdateProductDTO from "../domain/dto/UpdateProductDTO";
import ProductsApi from "./api/ProductsApi";

type Map<U = unknown> = Record<string, U>;

class Facade {
  async findAllProducts(): Promise<Map> {
    return await new ProductsApi().findAll();
  }

  async addProduct(dto: ProductDTO): Promise<Map> {
    return await new ProductsApi().add(dto);
  }

  async updateProduct(dto: UpdateProductDTO): Promise<Map> {
    return await new ProductsApi().update(dto);
  }

  async deleteProduct(id: number): Promise<Map> {
    return await new ProductsApi().delete(id);
  }
}

export default Facade;
