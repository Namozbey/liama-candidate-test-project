import React, { useMemo, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { parseCookies } from "nookies";
import { NotFound } from "./components/Fallbacks";
import { mainLayout, authLayout } from "./layouts";

export default function Routes(): JSX.Element {
  const token = useMemo(() => {
    const { token } = parseCookies();
    return token;
  }, []);

  if (!token) {
    return (
      <Switch>
        <Route
          path="/login"
          component={authLayout(lazy(() => import("./views/Login")))}
        />
        <Redirect from="*" to="/login" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={mainLayout(lazy(() => import("./views/Dashboard")))}
      />
      <Route path="/user" exact>
        User
      </Route>
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
