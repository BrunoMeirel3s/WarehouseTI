import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <Route exact path="/trocatoner" component={Dashboard} />
          <Route exact path="/suprimentos" component={Dashboard} />
          <Route exact path="/relatorios" component={Dashboard} />
          <Route exact path="/administracao" component={Dashboard} />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
