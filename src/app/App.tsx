import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'antd/dist/antd.min.css';

import AppSwitch from '../ui/components/AppSwitch';
import LoadingView from '../ui/components/LoadingView';
import './global.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoadingView />
        <AppSwitch />
      </BrowserRouter>
    </div>
  );
}

export default App;
