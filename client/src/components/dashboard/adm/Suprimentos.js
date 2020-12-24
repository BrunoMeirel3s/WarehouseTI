import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  inserirSuprimento,
  todosSuprimentosBanco,
} from "../../../actions/suprimentos";
import { setAlert } from "../../../actions/alert";

const Suprimentos = ({
  setAlert,
  inserirImpressora,
  obterTodasImpressoras,
  impressoras: {
    impressora,
    sucessoImpressora,
    todasImpressoras,
    sucessoTodasImpressoras,
  },
}) => {
  const [formData, setFormData] = useState({
    patrimonio: "",
    modelo: "",
    localizacao: "",
    enderecoIp: "",
    disponivel: "true",
    atualizarImpressora: false,
  });
  let i = 1;

  const {
    patrimonio,
    modelo,
    localizacao,
    enderecoIp,
    disponivel,
    atualizarImpressora,
  } = formData;

  useEffect(() => {
    obterTodasImpressoras();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    inserirImpressora(
      patrimonio,
      modelo,
      localizacao,
      enderecoIp,
      disponivel,
      atualizarImpressora
    );
    setFormData({
      ...formData,
      patrimonio: "",
      modelo: "",
      localizacao: "",
      enderecoIp: "",
      disponivel: "true",
      atualizarImpressora: false,
    });
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const editarImpressora = (impressora) => {
    document.getElementById("patrimonio").disabled = true;
    document.getElementById("registrar").innerText = "Atualizar";
    setFormData({
      ...formData,
      patrimonio: impressora.patrimonio,
      modelo: impressora.modelo,
      localizacao: impressora.localizacao,
      enderecoIp: impressora.enderecoIp,
      disponivel: impressora.disponivel,
      atualizarImpressora: true,
    });
    window.scrollTo(0, 0);
  };

  const limparFormulario = () => {
    document.getElementById("patrimonio").disabled = false;
    document.getElementById("registrar").innerText = "Inserir";
    setFormData({
      ...formData,
      patrimonio: "",
      modelo: "",
      localizacao: "",
      enderecoIp: "",
      disponivel: "true",
      atualizarUsuario: false,
    });
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <div className="mt-2">
        <h2>Cadastrar Impressoras:</h2>
        <Alert />
      </div>
      <form className="form mt-2" onSubmit={(e) => onSubmit(e)}>
        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label">Disponível:</label>
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
            <label className="label">Patrimônio:</label>
            <input
              id="patrimonio"
              type="text"
              className="form-control"
              name="patrimonio"
              value={patrimonio}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label">Modelo:</label>
            <input
              type="text"
              className="form-control"
              name="modelo"
              value={modelo}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
          <div className="form-group col-6">
            <label className="label">localizacao:</label>
            <input
              type="text"
              className="form-control"
              name="localizacao"
              value={localizacao}
              onChange={(e) => onChange(e)}
              required
            ></input>
          </div>
        </div>
        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label">Endereço IP:</label>
            <input
              type="text"
              className="form-control"
              name="enderecoIp"
              value={enderecoIp}
              onChange={(e) => onChange(e)}
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
        {todasImpressoras && todasImpressoras.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Status</th>
                <th scope="col">Modelo</th>
                <th scope="col">Patrimônio</th>
                <th scope="col">Localização</th>
                <th scope="col">Endereço IP</th>
                <th scope="col">Editar</th>
              </tr>
            </thead>
            <tbody>
              {todasImpressoras.map((impressora) => {
                return (
                  <tr key={impressora._id}>
                    <td>{i++}</td>
                    <td>
                      {impressora.disponivel ? "Disponível" : "Indisponível"}
                    </td>
                    <td>{impressora.modelo}</td>
                    <td>{impressora.patrimonio}</td>
                    <td>{impressora.localizacao}</td>
                    <td>{impressora.enderecoIp}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-red"
                        onClick={(e) => {
                          editarImpressora(impressora);
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
            * Nenhum equipamento disponível para ser visualizado
          </span>
        )}
      </div>
    </Fragment>
  );
};

Suprimentos.propTypes = {
  setAlert: PropTypes.func.isRequired,
  inserirImpressora: PropTypes.func.isRequired,
  obterTodasImpressoras: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  impressoras: state.impressoras,
});
export default connect(mapStateToProps, {
  setAlert,
  inserirImpressora,
  obterTodasImpressoras,
})(Suprimentos);
