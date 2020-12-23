import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import PrivateRoute from "../routing/PrivateRoute";
import Trocatoner from "./TrocaToner";
import Suprimentos from "./Suprimentos";
import Relatorios from "./Relatorios";
import Administracao from "./Administracao";
import { logout } from "../../actions/auth";
import img from "../imgs/icon-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faBoxes,
  faQrcode,
  faClipboardCheck,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Dashboard = ({ isAuthenticated, logout }) => {
  return (
    <Fragment>
      <Container>
        <div className="row container">
          <nav className="menu col-2 mt-5">
            <div className="logo d-flex flex-column align-items-center">
              <div className="mt-4">
                <img src={img} alt="Ícone" style={{ width: "60px" }} />
              </div>
              <h2>Warehouse</h2>
            </div>
            <hr className="bg-white" />
            <ul className="menu-items">
              <li
                className={`menu-item ${
                  window.location.pathname == "/trocatoner" ? "menu-active" : ""
                }`}
                id="registrartroca"
              >
                <Link to="/trocatoner">
                  <FontAwesomeIcon icon={faQrcode} />{" "}
                  <span>Registrar Troca</span>
                </Link>
              </li>
              <hr className="hr" />
              <li
                className={`menu-item ${
                  window.location.pathname == "/suprimentos"
                    ? "menu-active"
                    : ""
                }`}
                id="suprimentos"
              >
                <Link to="/suprimentos">
                  <FontAwesomeIcon icon={faBoxes} /> <span>Suprimentos</span>
                </Link>
              </li>
              <hr className="hr" />
              <li
                className={`menu-item ${
                  window.location.pathname == "/relatorios" ? "menu-active" : ""
                }`}
                id="relatorios"
              >
                <Link to="/relatorios">
                  <FontAwesomeIcon icon={faClipboardCheck} />{" "}
                  <span>Relatórios</span>
                </Link>
              </li>
              <hr className="hr" />
              <li
                className={`menu-item ${
                  window.location.pathname == "/administracao"
                    ? "menu-active"
                    : ""
                }`}
                id="relatorios"
              >
                <Link to="/administracao">
                  <FontAwesomeIcon icon={faWrench} /> <span>Administração</span>
                </Link>
              </li>
              <hr className="hr" />
              <li className="menu-item" id="relatorios">
                <Link className="menu-item" to="/" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>

          <div className="content col-8 mt-5">
            <Switch>
              <PrivateRoute exact path="/trocatoner" component={Trocatoner} />
              <PrivateRoute exact path="/suprimentos" component={Suprimentos} />
              <PrivateRoute
                exact
                path="/administracao"
                component={Administracao}
              />
              <PrivateRoute
                exact
                path="/administracaoimpressoras"
                component={Administracao}
              />
              <PrivateRoute
                exact
                path="/administracaosuprimentos"
                component={Administracao}
              />
              <PrivateRoute exact path="/relatorios" component={Relatorios} />
            </Switch>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Dashboard);
