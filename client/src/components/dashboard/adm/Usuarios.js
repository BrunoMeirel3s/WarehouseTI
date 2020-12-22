import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { inserirUsuario, obterTodosUsuarios } from "../../../actions/usuarios";
import { setAlert } from "../../../actions/alert";

const Usuarios = ({
  setAlert,
  inserirUsuario,
  obterTodosUsuarios,
  usuarios: {
    usuarioRegistrado,
    sucessoRegistroUsuario,
    todosUsuarios,
    sucessoTodosUsuarios,
  },
}) => {
  const [formData, setFormData] = useState({
    ativo: "true",
    nome: "",
    matricula: "",
    senha: "",
    confirmarSenha: "",
    administrador: "false",
    atualizarUsuario: "false",
  });
  let i = 1;

  const {
    ativo,
    nome,
    matricula,
    senha,
    confirmarSenha,
    administrador,
    atualizarUsuario,
  } = formData;

  useEffect(() => {
    obterTodosUsuarios();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      setAlert("Senha e confirmação de senha não correspondem!", "danger");
    } else {
      inserirUsuario(
        nome,
        matricula,
        senha,
        ativo,
        administrador,
        atualizarUsuario
      );
      setFormData({
        ...formData,
        ativo: "true",
        nome: "",
        matricula: "",
        senha: "",
        confirmarSenha: "",
        administrador: "false",
      });
    }
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const editarUsuario = (usuario) => {
    document.getElementById("matricula").disabled = true;
    document.getElementById("registrar").innerText = "Atualizar";
    setFormData({
      ...formData,
      nome: usuario.nome,
      matricula: usuario.matricula,
      administrador: usuario.administrador,
      ativo: usuario.ativo,
      atualizarUsuario: true,
    });
    window.scrollTo(0, 0);
  };

  const limparFormulario = () => {
    document.getElementById("matricula").disabled = false;
    document.getElementById("registrar").innerText = "Inserir";
    setFormData({
      ...formData,
      nome: "",
      matricula: "",
      administrador: "",
      ativo: "true",
      atualizarUsuario: false,
    });
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <div className="mt-2">
        <h4>Cadastrar Usuários:</h4>
        <Alert />
      </div>
      <form className="form mt-2" onSubmit={(e) => onSubmit(e)}>
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
              id="matricula"
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
          <button
            id="limpar"
            className="btn btn-lg btn-red ml-4"
            onClick={(e) => {
              limparFormulario();
            }}
          >
            Limpar
          </button>
        </div>
      </form>
      <hr />
      <div className="col-12">
        <h4>Usuários Registrados no Sistema:</h4>
        {todosUsuarios && todosUsuarios.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Matrícula</th>
                <th scope="col">Nome</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {todosUsuarios.map((usuario) => {
                let user = usuario;
                return (
                  <tr key={usuario._id}>
                    <td>{i++}</td>
                    <td>{usuario.ativo ? "Ativo" : "Inativo"}</td>
                    <td>{usuario.matricula}</td>
                    <td>{usuario.nome}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-red"
                        onClick={(e) => {
                          editarUsuario(usuario);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span className="ml-3 bg-danger text-light pr-2">
            * Nenhum usuário disponível para ser visualizado
          </span>
        )}
      </div>
    </Fragment>
  );
};

Usuarios.propTypes = {
  setAlert: PropTypes.func.isRequired,
  inserirUsuario: PropTypes.func.isRequired,
  obterTodosUsuarios: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  usuarios: state.usuarios,
});
export default connect(mapStateToProps, {
  setAlert,
  inserirUsuario,
  obterTodosUsuarios,
})(Usuarios);
