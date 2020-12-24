import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import {
  inserirSuprimento,
  obterTodosSuprimentos,
} from "../../actions/suprimentos";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Alert from "../layout/Alert";

const Suprimentos = ({
  inserirSuprimento,
  sucessoSuprimento,
  obterTodosSuprimentos,
  todosSuprimentos,
}) => {
  const [formData, setFormData] = useState({
    codigo: "",
    modelo: "C911",
    disponivel: "true",
    cor: "Preto",
    atualizarSuprimento: false,
  });

  const { codigo, modelo, disponivel, cor, atualizarSuprimento } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    inserirSuprimento(codigo, modelo, disponivel, cor, atualizarSuprimento);
    setFormData({ ...formData, codigo: " " });
  };
  let i = 1;
  useEffect(() => {
    obterTodosSuprimentos();
  }, []);

  return (
    <Fragment>
      <div className="mt-3">
        <h1>Suprimentos</h1>
        <hr />
        <h4>Registro de Novos Suprimentos:</h4>
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
                name="codigo"
                value={codigo}
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
                <option value="Majenta">Majenta</option>
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
            <button id="limpar" className="btn btn-lg btn-red ml-4">
              Limpar
            </button>
          </div>
        </form>
        <hr />
      </div>
      <div className="mt-1 col-12">
        <h4>Suprimentos Disponíveis:</h4>
        {todosSuprimentos && todosSuprimentos.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Código </th>
                <th scope="col">Modelo </th>
                <th scope="col">Cor </th>
                <th scope="col">Data de Inserção</th>
              </tr>
            </thead>
            <tbody>
              {todosSuprimentos.map((sup) => {
                return (
                  <tr key={sup._id}>
                    <td>{i++}</td>
                    <td className="">{sup.codigo}</td>
                    <td>{sup.modelo}</td>
                    <td>{sup.cor}</td>
                    <td>
                      <Moment format="DD/MM/YYYY">{sup.data}</Moment>
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
  inserirSuprimento: PropTypes.func.isRequired,
  sucessoSuprimento: PropTypes.bool,
  obterTodosSuprimentos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sucessoSuprimento: state.suprimentos.sucessoSuprimento,
  todosSuprimentos: state.suprimentos.todosSuprimentos,
});

export default connect(mapStateToProps, {
  inserirSuprimento,
  obterTodosSuprimentos,
})(Suprimentos);
