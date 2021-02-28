import { message } from 'antd';
import React, { ChangeEvent, useEffect } from 'react';

import './styles.css';

interface AppInputProps {
  label?: string;
  name: string;
  value?: string;
  min?: number;
  type?: 'text' | 'number' | 'file';

  required?: boolean;
}

const AppInput: React.FC<AppInputProps> = ({
  label, name, type = 'text', value, min, required = false,
}) => {
  const inputRef = React.createRef<HTMLInputElement>();

  useEffect(() => {
    if (inputRef.current && value) {
      if (type === 'file') {
        const divImage = document.getElementById(`${name}-image-div`);

        const imgTag = document.createElement('img');
        imgTag.src = value;
        imgTag.alt = 'Imagem selecionada.';

        divImage?.appendChild(imgTag);
      } else {
        inputRef.current.value = value;
      }
    }

    // eslint-disable-next-line
  }, [inputRef, value]);

  function handleSelectImage(e?: ChangeEvent<HTMLInputElement>) {
    if (e && e.target.files && e.target.files[0]) {
      if (!e.target.files[0].type.startsWith('image')) {
        message.error('O arquivo selecionado não é uma imagem!');

        e.target.files = null;

        return;
      }

      const divImage = document.getElementById(`${name}-image-div`);

      let imgTag = divImage?.getElementsByTagName('img')[0];

      const imgPath = URL.createObjectURL(e.target.files[0]) as string ?? '';

      if (imgTag) {
        imgTag.src = imgPath;
      } else {
        imgTag = document.createElement('img');
        imgTag.src = imgPath;
        imgTag.alt = 'Imagem selecionada.';

        divImage?.appendChild(imgTag);
      }
    } else {
      inputRef.current?.click();

      const divImage = document.getElementById(`${name}-image-div`);

      let imgTag = divImage?.getElementsByTagName('img')[0];

      if (imgTag) {
        imgTag.remove();
      }
    }
  }

  return (
    <div className={
      `app-input-group${type === 'file' ? ' filetype' : ''}`
    }>
      {
        type === 'file' && (
          <div id={`${name}-image-div`} onClick={() => handleSelectImage()}>
            <div
              className="div-input-file"
            >
              Escolher Imagem
            </div>
          </div>
        )
      }
      <input
        ref={inputRef}
        type={type}
        name={name}
        min={min}

        onChange={
          type === 'file'
            ? handleSelectImage
            : undefined
        }

        step={
          type === 'number'
            ? 'any'
            : undefined
        }

        required={required}
      />
      <label>{label}</label>
    </div>
  );
}

export default AppInput;
