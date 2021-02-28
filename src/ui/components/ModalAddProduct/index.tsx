import React, { useContext, useImperativeHandle, useState } from 'react';
import ProductDTO from '../../../domain/dto/ProductDTO';
import UpdateProductDTO from '../../../domain/dto/UpdateProductDTO';
import Product from '../../../domain/models/Product';
import { hideLoadingView, showLoadingView } from '../../../utils/ComponentUtils';
import { ProductsContext } from '../../contexts/ProductsContext';
import AppForm, { AppFormHandlers } from '../AppForm';
import AppInput from '../AppInput';
import AppModal from '../AppModal';

import './styles.css';

export interface ModalAddProductHandlers {
  show: () => void;
  hide: () => void;
}

interface ModalAddProductProps {
  productToEdit?: Product;
  clearEditProduct?: () => void;
}

const ModalAddProduct = React.forwardRef<ModalAddProductHandlers, ModalAddProductProps>((
  { productToEdit, clearEditProduct }, ref
) => {
  const addProductFormRef = React.createRef<AppFormHandlers>();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const { add, update } = useContext(ProductsContext);

  useImperativeHandle(ref, () => {
    return {
      show, hide,
    };
  });

  function show() {
    setIsVisible(true);
  }

  function hide() {
    if (clearEditProduct) {
      clearEditProduct();
    }

    setIsVisible(false);

    addProductFormRef.current?.clearFormValues();
  }

  async function handleFinish(values: Record<string, any>): Promise<boolean> {
    let result = false;

    showLoadingView();

    if (productToEdit) {
      values['id'] = productToEdit.id;

      const dto: UpdateProductDTO = values as UpdateProductDTO;

      result = await update(dto);
    } else {
      const dto: ProductDTO = values as ProductDTO;

      result = await add(dto);
    }

    hideLoadingView();

    if (result) {
      hide();

      if (productToEdit && clearEditProduct) {
        clearEditProduct();

        addProductFormRef.current?.clearFormValues();
      }
    }

    return result;
  }

  return (
    <AppModal
      show={isVisible}
      hide={hide}
      title={
        productToEdit
          ? "Editar Produto"
          : "Adicionar Produto"
      }
    >
      {isVisible && <AppForm
        ref={addProductFormRef}
        id="add-product-form"
        onSubmit={handleFinish}
      >
        <AppInput
          label="Nome"
          name="name"
          value={productToEdit?.name}

          required
        />

        <AppInput
          label="Preço"
          name="price"
          type="number"
          min={1}
          value={productToEdit?.price.toString()}

          required
        />

        <AppInput
          name="image"
          type="file"

          value={productToEdit?.image_path}
        />

        <button type="submit">
          {productToEdit ? 'Salvar' : 'Adicionar'}
        </button>
      </AppForm>}
    </AppModal>
  );
});

export default ModalAddProduct;
