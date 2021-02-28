import React, { createRef, useContext, useEffect, useState } from 'react';
import { Row } from 'antd';
import { MdAdd, MdDeleteForever, MdEdit, MdRefresh } from 'react-icons/md';

import Product from '../../../domain/models/Product';
import LoadingCircle from '../LoadingCircle';
import { ProductsContext } from '../../contexts/ProductsContext';

import './styles.css';
import Center from '../Center';
import ModalAddProduct, { ModalAddProductHandlers } from '../ModalAddProduct';
import ModalConfirmDeleteProduct from '../ModalConfirmDeleteProduct';

const ProductList: React.FC = () => {
  const modalAddProductRef = createRef<ModalAddProductHandlers>();
  const modalDeleteProductRef = createRef<ModalAddProductHandlers>();
  const { data, error, fetchData } = useContext(ProductsContext);

  const [productToEdit, setProductToEdit] = useState<Product>();
  const [productToDelete, setProductToDelete] = useState<Product>();

  useEffect(() => {
    if (!data) {
      fetchData();
    }

    // eslint-disable-next-line
  }, []);

  function handleEdit(item: Product) {
    setProductToEdit(item);

    modalAddProductRef.current?.show();
  }

  function handleDelete(item: Product) {
    setProductToDelete(item);

    modalDeleteProductRef.current?.show();
  }

  return (
    <div className="app-product-list">
      <header>
        <strong>Lista de Produtos</strong>
        <Row>
          <MdRefresh
            size={48}
            color="var(--primary-color);"
            onClick={() => fetchData()}
          />
          <MdAdd
            size={48}
            color="var(--primary-color);"
            onClick={() => modalAddProductRef.current?.show()}
          />
        </Row>
      </header>
      {error && <p>{error}</p>}
      {
        !data && !error && <Center>
          <LoadingCircle />
        </Center>
      }
      {data && <ul>
        {data.map(item =>
          <li key={item.id}>
            <div>
              {item.image_path &&
                <img
                  src={item.image_path}
                  alt={`Imagem do produto ${item.name}`}
                />
              }
              <div>
                <strong>{item.name}</strong>
                <span>R$ {item.price}</span>
              </div>
            </div>
            <div>
              <MdEdit
                size={32}
                color="var(--primary-color);"
                onClick={() => handleEdit(item)}
              />
              <MdDeleteForever
                size={32}
                color="var(--primary-color);"
                onClick={() => handleDelete(item)}
              />
            </div>
          </li>
        )}
      </ul>}
      <ModalAddProduct
        ref={modalAddProductRef}
        productToEdit={productToEdit}
        clearEditProduct={() => setProductToEdit(undefined)}
      />
      <ModalConfirmDeleteProduct
        ref={modalDeleteProductRef}
        product={productToDelete}
        clearProductToDelete={() => setProductToDelete(undefined)}
      />
    </div>
  );
}

export default ProductList;
