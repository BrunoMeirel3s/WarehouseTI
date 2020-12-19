import React, { Fragment, useState } from "react";
import {Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";
import {Container} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import img from "../imgs/icon-white.png";
import Alert from '../layout/Alert'

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    matricula: "",
    senha: "",
  });

  const { matricula, senha } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(matricula, senha);
  };

  if (isAuthenticated) {
    return <Redirect to="/trocatoner" />;
  }

  return (
    <Fragment>
      <Container>
        <div className="d-flex justify-content-center">
          <div className="card mt-5">
            <div className="card-header text-light" align="center">
              <div id="logo-login">
                <img src={img} alt="Ícone" style={{ width: "60px" }} />
              </div>
              <h2>Warehouse</h2>
            </div>

            <div className="card-body">
              <form method="post" className="form" onSubmit={onSubmit}>
                <div class="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuário"
                    name="matricula"
                    value={matricula}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Senha"
                    name="senha"
                    value={senha}
                    onChange={onChange}
                    required
                  />
                </div>
                <Alert/>
                <div className="form-group" align="center">
                  <input
                    type="submit"
                    value="Entrar"
                    className="btn btn-lg btn-red"
                  />
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
