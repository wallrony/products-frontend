import { message } from 'antd';
import React, { useContext, useImperativeHandle, useState } from 'react';
import Product from '../../../domain/models/Product';
import { ProductsContext } from '../../contexts/ProductsContext';
import AppModal from '../AppModal';

import './styles.css';

export interface ModalRemoveProductHandlers {
  show: () => void;
  hide: () => void;
}

interface ModalRemoveProductProps {
  product?: Product;
  clearProductToDelete: () => void;
}

const ModalConfirmDeleteProduct = React.forwardRef<ModalRemoveProductHandlers, ModalRemoveProductProps>((
  { product, clearProductToDelete }, ref
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { remove } = useContext(ProductsContext);

  useImperativeHandle(ref, () => {
    return {
      show, hide,
    };
  });

  function show() {
    setIsVisible(true);
  }

  function hide() {
    setIsVisible(false);
  }

  function handleCancel() {
    clearProductToDelete();

    hide();
  }

  async function handleConfirm() {
    let clearData = false;

    if (product) {
      clearData = await remove(product.id);
    } else {
      message.error('Ocorreu um erro: produto não selecionado. Por favor, tente novamente');

      clearData = true;
    }

    if (clearData) {
      hide();
      clearProductToDelete();
    }
  }

  return (
    <AppModal
      id="delete-product-modal"
      title="Excluir Produto"
      show={(product ?? false) && isVisible}
      hide={hide}
    >
      <p>Tem certeza que deseja excluir o produto {product?.name}?</p>

      <div className="grid col-2 row-btns">
        <button type="reset" onClick={handleCancel}>Cancelar</button>
        <button type="submit" onClick={handleConfirm}>Confirmar</button>
      </div>
    </AppModal>
  );
});

export default ModalConfirmDeleteProduct;
