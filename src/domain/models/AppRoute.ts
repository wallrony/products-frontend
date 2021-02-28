import React from "react";
import { RouteProps } from 'react-router-dom';

interface AppRoute {
  path: string;
  component: React.FC<RouteProps>;
}

export default AppRoute;
