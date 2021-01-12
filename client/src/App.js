import React, { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import PrivateRouteAdmin from "./components/routing/PrivateRouteAdmin";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/trocatoner" component={Dashboard} />
          <PrivateRoute exact path="/suprimentos" component={Dashboard} />
          <PrivateRoute exact path="/relatorios" component={Dashboard} />
          <PrivateRouteAdmin
            exact
            path="/administracao"
            component={Dashboard}
          />
          <PrivateRouteAdmin
            exact
            path="/administracaoimpressoras"
            component={Dashboard}
          />
          <PrivateRouteAdmin
            exact
            path="/administracaosuprimentos"
            component={Dashboard}
          />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
