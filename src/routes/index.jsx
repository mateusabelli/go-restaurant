import { Routes as RouterDom, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";

const Routes = () => (
  <RouterDom>
    <Route path="/" element={<Dashboard />} />
  </RouterDom>
);

export default Routes;
