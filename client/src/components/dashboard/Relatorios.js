import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { obterRelatorio } from "../../actions/relatorio";

const Relatorios = ({
  obterRelatorio,
  relatorio: { relatorio, sucessoObterRelatorio },
}) => {
  const [formData, setFormData] = useState({
    dataInicial: "",
    dataFinal: "",
  });

  const { dataInicial, dataFinal } = formData;
  let i = 1;

  const onSubmit = async (e) => {
    e.preventDefault();
    obterRelatorio(dataInicial, dataFinal);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="mt-3">
        <h1>Relatório de Trocas:</h1>
        <hr />
        {/*<Alert />*/}
        <div className="col-12 d-flex">
          <form className="form-group d-flex" onSubmit={(e) => onSubmit(e)}>
            <div className="col-5">
              <label className="label" for="patrimonio">
                Data Inicial:
              </label>
              <input
                type="date"
                className="form-control"
                name="dataInicial"
                value={dataInicial}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="col-5">
              <label className="label" for="tonerTrocado">
                Data Final:
              </label>
              <div className="input-group">
                <input
                  type="date"
                  className="form-control"
                  name="dataFinal"
                  value={dataFinal}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>
            </div>
            <div className="col-2 mt-3 pt-3">
              <button type="submit" className="btn btm-lg btn-red">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 d-flex">
          {relatorio && relatorio.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Patrimônio</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Localização</th>
                  <th scope="col">Toner</th>
                  <th scope="col">Total A3</th>
                  <th scope="col">Total A4</th>
                  <th scope="col">Usuário</th>
                </tr>
              </thead>
              <tbody>
                {relatorio.map((rel) => {
                  return (
                    <tr key={rel._id}>
                      <td>{i++}</td>
                      <td>{rel.patrimonio}</td>
                      <td>{rel.modeloImpressora}</td>
                      <td>{rel.localizacao}</td>
                      <td>{rel.corToner}</td>
                      <td>{rel.totalA3}</td>
                      <td>{rel.totalA4}</td>
                      <td>{rel.usuario}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="col-12 d-flex bg-info">
              Selecione um período para exibição
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};
Relatorios.propTypes = {
  obterRelatorio: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  relatorio: state.relatorio,
});
export default connect(mapStateToProps, { obterRelatorio })(Relatorios);
