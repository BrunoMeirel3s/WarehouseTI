import React, { Fragment, useState } from "react";
import { Link, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrivateRoute from "../routing/PrivateRoute";
import Trocatoner from "./TrocaToner";

const Dashboard = (props) => {
  return (
    <Fragment>
      <Container>
        <div className="row">
          <nav className="menu col-3 mt-5">
            <div className="logo d-flex flex-column align-items-center">
              <div className="mt-4">
                <img
                  src="imgs/icon-white.png"
                  alt="Ícone"
                  style="width: 60px"
                />
              </div>
              <h2>Warehouse</h2>
            </div>
            <hr className="bg-white" />
            <ul className="menu-items">
              <li className="activ">
                <a href="dashboard.html">Trocar Toner</a>
              </li>
              <li className="activ">
                <a href="relatorios.html">Relatórios</a>
              </li>
            </ul>
          </nav>

          <div className="content col-8 mt-5">
            <Switch>
                <PrivateRoute exact path="/" component={Trocatoner}/>
            </Switch>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
