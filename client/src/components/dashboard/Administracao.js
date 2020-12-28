import React, { Fragment } from "react";
import Usuarios from "./adm/Usuarios";
import Impressoras from "./adm/Impressoras";
import Suprimentos from "./adm/Suprimentos";
import { Link } from "react-router-dom";
import { BrowserRouter as Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";

const Administracao = (props) => {
  return (
    <Fragment>
      <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
        <li class="nav-item">
          <Link
            class={`nav-link text-dark ${
              window.location.pathname == "/administracao" ? "active" : ""
            }`}
            id="usuarios-tab"
            data-toggle="tab"
            to="/administracao"
            role="tab"
            aria-controls="usuarios"
            aria-selected={
              window.location.pathname == "/administracao" ? "true" : "false"
            }
          >
            Usuários
          </Link>
        </li>
        <li class="nav-item">
          <Link
            class={`nav-link text-dark ${
              window.location.pathname == "/administracaoimpressoras"
                ? "active"
                : ""
            }`}
            id="impressoras-tab"
            data-toggle="tab"
            to="/administracaoimpressoras"
            role="tab"
            aria-controls="impressoras"
            aria-selected={
              window.location.pathname == "/administracaoimpressoras"
                ? "true"
                : "false"
            }
          >
            Impressoras
          </Link>
        </li>
        <li class="nav- ">
          <Link
            class={`nav-link text-dark ${
              window.location.pathname == "/administracaosuprimentos"
                ? "active"
                : ""
            }`}
            id="suprimentos-tab"
            data-toggle="tab"
            to="/administracaosuprimentos"
            role="tab"
            aria-controls="suprimentos"
            aria-selected={
              window.location.pathname == "/administracaosuprimentos"
                ? "true"
                : "false"
            }
          >
            Suprimentos
          </Link>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div>
          <Switch>
            <PrivateRoute exact path="/administracao" component={Usuarios} />
            <PrivateRoute
              exact
              path="/administracaoimpressoras"
              component={Impressoras}
            />
            <PrivateRoute
              exact
              path="/administracaosuprimentos"
              component={Suprimentos}
            />
          </Switch>
        </div>
      </div>
    </Fragment>
  );
};

Administracao.propTypes = {};

export default Administracao;
