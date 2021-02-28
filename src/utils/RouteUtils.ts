import AppRoute from "../domain/models/AppRoute";
import HomePage from "../ui/pages/HomePage";

const defaultRoutes: AppRoute[] = [
  {
    path: '/',
    component: HomePage
  }
];

export function getDefaultRoutes() {
  return defaultRoutes;
}
