import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { inserirUsuario } from "../../../actions/usuarios";
import { obterRelatorio } from "../../../actions/relatorio";

const Usuarios = ({
  inserirUsuario,
  usuarios: { usuario, sucessoRegistroUsuario },
}) => {
  const [formData, setFormData] = useState({
    ativo: "true",
    nome: "",
    matricula: "",
    senha: "",
    confirmarSenha: "",
    administrador: "false",
  });

  const {
    ativo,
    nome,
    matricula,
    senha,
    confirmarSenha,
    administrador,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1>Administração de Usuários</h1>
      <hr />
      <h4>Criar Novo Usuário:</h4>
      <form className="form">
        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label">Ativo</label>
            <select
              className="form-control"
              name="ativo"
              value={ativo}
              onChange={(e) => onChange(e)}
            >
              <option value="true">Sim</option>
              <option value="false">Não</option>
            </select>
          </div>
          <div className="form-group col-4">
            <label className="label">Matrícula:</label>
            <input
              type="text"
              className="form-control"
              name="matricula"
              value={matricula}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="form-group col-6">
            <label className="label">Nome:</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={nome}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
          <div className="form-group col-2">
            <label className="label">Administrador</label>
            <select
              className="form-control"
              name="administrador"
              value={administrador}
              onChange={(e) => onChange(e)}
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </select>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label">Senha:</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={senha}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
          <div className="form-group col-4">
            <label className="label">Confirmar Senha:</label>
            <input
              type="password"
              className="form-control"
              name="confirmarSenha"
              value={confirmarSenha}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
        </div>
        <div className="col-8 d-flex justify-content-center mb-4">
          <button
            type="submit"
            id="registrar"
            className="btn btn-lg btn-red mr-4"
          >
            Inserir
          </button>
          <button id="limpar" className="btn btn-lg btn-red ml-4">
            Limpar
          </button>
        </div>
      </form>
      <div className="col-12 d-flex">
        <h4>Usuários:</h4>
      </div>
    </Fragment>
  );
};

Usuarios.propTypes = {
  inserirUsuario: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usuarios: state.usuarios,
});
export default connect(mapStateToProps, { inserirUsuario })(Usuarios);
