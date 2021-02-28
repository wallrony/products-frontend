import ProductDTO from "../../domain/dto/ProductDTO";
import UpdateProductDTO from "../../domain/dto/UpdateProductDTO";
import Client, { setContentTypeFormData, setContentTypeJson } from "./Client";

class ProductsApi {
  async findAll() {
    const result = await Client.get<Record<string, any>>('/core/products');

    return result.data;
  }

  async add(dto: ProductDTO) {
    const formData = new FormData();

    formData.append('name', dto.name);
    formData.append('price', dto.price.toString());

    if (dto.image) {
      formData.append('image', dto.image, dto.image.name);

      setContentTypeFormData();
    }

    const result = await Client.post('/core/products', formData);

    setContentTypeJson();

    return result.data;
  }

  async update(dto: UpdateProductDTO) {
    const formData = new FormData();

    formData.append('id', dto.id.toString());
    formData.append('name', dto.name);
    formData.append('price', dto.price.toString());

    if (dto.image) {
      formData.append('image', dto.image, dto.image.name);

      setContentTypeFormData();
    }

    const result = await Client.put(`/core/products/${dto.id}`, formData);

    setContentTypeJson();

    return result.data;
  }

  async delete(id: number) {
    const result = await Client.delete(`/core/products/${id}`);

    return result.data;
  }
}

export default ProductsApi;
