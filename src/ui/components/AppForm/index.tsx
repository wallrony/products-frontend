import React, { FormEvent, PropsWithChildren, useImperativeHandle } from 'react';

import './styles.css';

export interface AppFormHandlers {
  clearFormValues: () => void;
}

interface AppFormProps {
  id?: string;
  onSubmit: (values: Record<string, any>) => Promise<boolean>;
}

const AppForm = React.forwardRef<AppFormHandlers, PropsWithChildren<AppFormProps>>(({
  children, id, onSubmit
}, ref) => {
  const formRef = React.createRef<HTMLFormElement>();

  useImperativeHandle(ref, () => {
    return {
      clearFormValues,
    };
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (formRef.current) {
      const values: Record<string, any> = {};

      const inputs: HTMLCollectionOf<HTMLInputElement> = formRef.current.getElementsByTagName('input');

      for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i];

        if (field.type === 'file') {
          values[field.name] = field.files ? field.files[0] : null;
        } else {
          values[field.name] = field.value;
        }
      }

      const result: boolean = await onSubmit(values);

      if (result) {
        clearFormValues();
      }
    }
  }

  function clearFormValues() {
    if (formRef.current) {
      const inputs: HTMLCollectionOf<HTMLInputElement> = formRef.current.getElementsByTagName('input');

      for (let i = 0; i < inputs.length; i++) {
        const field = inputs[i];

        field.value = '';

        if (field.type === 'file') {
          field.files = null;

          const imgs = formRef.current.getElementsByTagName('img');

          let imgsLength = imgs.length;

          for (let i = 0; i < imgsLength; i++) {
            imgs[i].remove();

            i--;
            imgsLength--;
          }
        }
      }
    }
  }

  return (
    <form
      ref={formRef}
      id={id}
      className="app-form"
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
});

AppForm.displayName = 'AppForm';

export default AppForm;
