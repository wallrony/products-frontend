import React from 'react';
import { MdClose } from 'react-icons/md';

import './styles.css';

interface AppModalProps {
  id?: string;
  show: boolean;
  hide: () => void;
  title: string;
}

const AppModal: React.FC<AppModalProps> = ({
  children, id, show, hide, title
}) => {
  return (
    <div
      id={id}
      className={
        `app-modal-overlay${show ? ' show' : ''}`
      }
      role="document"
    >
      <div className="modal-container">
        <header>
          <strong>{title}</strong>
        </header>
        <button className="close-modal-btn" onClick={hide}>
          <MdClose
            color="var(--primary-color);"
            size={32}
          />
        </button>
        {children}
      </div>
    </div>
  );
}

export default AppModal;
