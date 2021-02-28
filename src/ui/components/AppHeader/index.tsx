import React from 'react';
import { MdShopTwo } from 'react-icons/md';

import './styles.css';

const AppHeader: React.FC = () => {
  return (
    <header className="app-header">
      <MdShopTwo />
      <strong>Meus Produtos</strong>
    </header>
  );
}

export default AppHeader;
