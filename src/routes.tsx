import React, { lazy } from "react";
import { NotFound } from "./components/Fallbacks";
import { mainLayout } from "./layouts";
import { Switch, Route, Redirect } from "react-router-dom";

export default function Routes(): JSX.Element {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route
        path="/products"
        component={mainLayout(lazy(() => import("./views/products")))}
      />
      <Route
        exact
        path="/home"
        component={mainLayout(lazy(() => import("./views/home")))}
      />
      <Route path="/admin" exact>
        Admin
      </Route>
      <Route path="/other" exact>
        Other
      </Route>
      <Redirect from="/login" to="/" />
      <Route path="*" component={NotFound} />
    </Switch>
  );
}
