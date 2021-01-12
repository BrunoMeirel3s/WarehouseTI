import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  inserirSuprimento,
  obterTodosSuprimentosBanco,
} from "../../../actions/suprimentos";
import { setAlert } from "../../../actions/alert";

const Suprimentos = ({
  inserirSuprimento,
  obterTodosSuprimentosBanco,
  suprimentos: { todosSuprimentosBanco, sucessoSuprimento },
}) => {
  const [formData, setFormData] = useState({
    codigoToner: "",
    modelo: "C911",
    disponivel: "true",
    cor: "Preto",
    atualizarSuprimento: false,
  });
  let i = 1;

  const {
    codigoToner,
    modelo,
    disponivel,
    cor,
    atualizarSuprimento,
  } = formData;

  useEffect(() => {
    obterTodosSuprimentosBanco();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    inserirSuprimento(
      codigoToner.trim(),
      modelo,
      disponivel,
      cor,
      atualizarSuprimento
    );

    setFormData({
      ...formData,
      codigoToner: "",
      modelo: "C911",
      cor: "Preto",
      disponivel: "true",
      atualizarSuprimento: false,
    });
    document.getElementById("codigoToner").disabled = false;
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const editarSuprimento = (suprimento) => {
    document.getElementById("codigoToner").disabled = true;
    document.getElementById("registrar").innerText = "Atualizar";
    setFormData({
      ...formData,
      codigoToner: suprimento.codigo,
      modelo: suprimento.modelo,
      cor: suprimento.cor,
      disponivel: suprimento.disponivel,
      atualizarSuprimento: true,
    });
    window.scrollTo(0, 0);
  };

  const limparFormulario = (e) => {
    e.preventDefault();
    document.getElementById("codigoToner").disabled = false;
    document.getElementById("registrar").innerText = "Inserir";
    setFormData({
      ...formData,
      codigoToner: "",
      modelo: "",
      cor: "",
      disponivel: "true",
      atualizarSuprimento: false,
    });
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <div className="mt-2">
        <h2>Cadastrar Suprimentos:</h2>
        <Alert />
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="col-12 d-flex">
            <div className="form-group col-4">
              <label className="label">Disponível</label>
              <select
                className="form-control"
                name="disponivel"
                value={disponivel}
                onChange={(e) => onChange(e)}
              >
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </select>
            </div>
            <div className="form-group col-4">
              <label className="label">Código Toner:</label>
              <input
                type="text"
                className="form-control"
                id="codigoToner"
                name="codigoToner"
                value={codigoToner}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
          </div>
          <div className="col-12 mb-2 d-flex">
            <div className="col-4">
              <label className="label">Modelo</label>
              <select
                className="form-control"
                name="modelo"
                value={modelo}
                onChange={(e) => onChange(e)}
              >
                <option value="C911">C911</option>
                <option value="outro">Outro</option>
              </select>
            </div>
            <div className="form-group col-7">
              <label className="label">Cor:</label>
              <select
                className="form-control"
                name="cor"
                value={cor}
                onChange={(e) => onChange(e)}
              >
                <option value="Preto">Preto</option>
                <option value="Amarelo">Amarelo</option>
                <option value="Magenta">Magenta</option>
                <option value="Ciano">Ciano</option>
              </select>
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
                limparFormulario(e);
              }}
            >
              Limpar
            </button>
          </div>
        </form>
        <hr />
      </div>
      <div className="mt-1 col-12">
        <h4>Suprimentos Cadastrados no Sistema:</h4>
        {todosSuprimentosBanco && todosSuprimentosBanco.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Código </th>
                <th scope="col">Modelo </th>
                <th scope="col">Cor </th>
                <th scope="col">Utilizado</th>
                <th scope="col">Data de Inserção</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {todosSuprimentosBanco.map((sup) => {
                return (
                  <tr key={sup._id}>
                    <td>{i++}</td>
                    <td>{sup.disponivel ? "Disponível" : "Indisponível"}</td>
                    <td>{sup.codigo}</td>
                    <td>{sup.modelo}</td>
                    <td>{sup.cor}</td>
                    <td>{sup.utilizado ? "Sim" : "Não"}</td>
                    <td>
                      <Moment format="DD/MM/YYYY">{sup.data}</Moment>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-red"
                        onClick={(e) => {
                          editarSuprimento(sup);
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
            * Sem suprimentos disponíveis para utilização
          </span>
        )}
      </div>
    </Fragment>
  );
};

Suprimentos.propTypes = {
  setAlert: PropTypes.func.isRequired,
  inserirSuprimento: PropTypes.func.isRequired,
  obterTodosSuprimentosBanco: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  suprimentos: state.suprimentos,
});
export default connect(mapStateToProps, {
  setAlert,
  inserirSuprimento,
  obterTodosSuprimentosBanco,
})(Suprimentos);
