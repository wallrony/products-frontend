import React, { createContext, useState } from 'react';
import { message } from 'antd';

import Product from '../../domain/models/Product';
import ServiceResponse from '../../domain/models/ServiceResponse';
import ProductsService from '../../services/ProductsService';
import ProductDTO from '../../domain/dto/ProductDTO';
import UpdateProductDTO from '../../domain/dto/UpdateProductDTO';

interface ProductsContextProps {
  data: Product[] | undefined;
  error: string | undefined;
  fetchData: () => Promise<void>;

  add: (dto: ProductDTO) => Promise<boolean>;
  update: (dto: UpdateProductDTO) => Promise<boolean>;
  remove: (id: number) => Promise<boolean>;
}

export const ProductsContext = createContext({} as ProductsContextProps);

const ProductsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<Product[]>();
  const [error, setError] = useState<string>();

  async function fetchData() {
    if (error) {
      setError(undefined);
    }

    if (data) {
      setData(undefined);
    }

    const result = await new ProductsService().fetch();

    treatFetchData(result);
  }

  function treatFetchData(result: ServiceResponse<Product[]>) {
    if (result.error) {
      // message.error(result.error);
      setError(result.error);
    } else if (result.data) {
      setData(result.data);
    }
  }

  async function add(dto: ProductDTO): Promise<boolean> {
    const result = await new ProductsService().add(dto);

    return treatAdd(result);
  }

  function treatAdd(result: ServiceResponse): boolean {
    if (result.error) {
      message.error(result.error);

      return false;
    }

    message.success('Produto adicionado com sucesso!');

    fetchData();

    return true;
  }

  async function update(dto: UpdateProductDTO): Promise<boolean> {
    const result = await new ProductsService().update(dto);

    return treatUpdate(result);
  }

  function treatUpdate(result: ServiceResponse): boolean {
    if (result.error) {
      message.error(result.error);

      return false;
    }

    message.success('Produto alterado com sucesso!');

    fetchData();

    return true;
  }

  async function remove(id: number): Promise<boolean> {
    const result = await new ProductsService().delete(id);

    return treatRemove(result);
  }

  function treatRemove(result: ServiceResponse): boolean {
    if (result.error) {
      message.error(result.error);

      return false;
    }

    message.success('Produto removido com sucesso!');

    fetchData();

    return true;
  }

  return (
    <ProductsContext.Provider
      value={{
        data,
        error,
        fetchData,
        add,
        update,
        remove
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export default ProductsProvider;
