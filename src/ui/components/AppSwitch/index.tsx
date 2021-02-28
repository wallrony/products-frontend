import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { getDefaultRoutes } from '../../../utils/RouteUtils';
import ProductsProvider from '../../contexts/ProductsContext';
import AppHeader from '../AppHeader';

const AppSwitch: React.FC = () => {
  const routes = getDefaultRoutes();

  const routeChildren = routes.map(item => (
    <Route
      key={item.path}
      path={item.path}
      exact
      render={props => <item.component {...props} />}
    />
  ));

  // Default Structure With App Providers (Context API Providers)
  const skeleton = (
    <ProductsProvider>
      <AppHeader />
      {routeChildren}
    </ProductsProvider>
  );

  return (
    <Switch>
      {skeleton}
    </Switch>
  );
}

export default AppSwitch;
