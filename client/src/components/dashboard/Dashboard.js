import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrivateRoute from "../routing/PrivateRoute";
import Trocatoner from "./TrocaToner";
import Suprimentos from "./Suprimentos";
import Relatorios from './Relatorios'
import img from "../imgs/icon-white.png";

const Dashboard = (props) => {
  return (
    <Fragment>
      <Container>
        <div className="row">
          <nav className="menu col-3 mt-5">
            <div className="logo d-flex flex-column align-items-center">
              <div className="mt-4">
                <img src={img} alt="Ícone" style={{ width: "60px" }} />
              </div>
              <h2>Warehouse</h2>
            </div>
            <hr className="bg-white" />
            <ul className="menu-items">
              <li className="menu-item" id="registrartroca">
                <Link to="/trocatoner">Registrar Troca</Link>
              </li>
              <li className="menu-item" id="suprimentos">
                <Link to="/suprimentos">Suprimentos</Link>
              </li>
              <li className="menu-item" id="relatorios">
                <Link to="/relatorios">Relatórios</Link>
              </li>
            </ul>
          </nav>

          <div className="content col-8 mt-5">
            <Switch>
              <Route exact path="/trocatoner" component={Trocatoner} />
              <Route exact path="/suprimentos" component={Suprimentos} />
              <Route exact path="/relatorios" component={Relatorios} />
            </Switch>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
