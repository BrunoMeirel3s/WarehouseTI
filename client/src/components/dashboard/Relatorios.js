import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";
import { obterRelatorio } from "../../actions/relatorio";

const Relatorios = ({ obterRelatorio, relatorio: { relatorio } }) => {
  const [formData, setFormData] = useState({
    dataInicial: "",
    dataFinal: "",
  });

  const { dataInicial, dataFinal } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    obterRelatorio(dataInicial, dataFinal);
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const printPDF = (e) => {
    let mywindow = window.open(
      "",
      "PRINT",
      "height=650,width=auto,top=100,left=150"
    );

    mywindow.document.write(
      `<html><head><title>${`Relatório de troca`}</title>`
    );

    mywindow.document.write(`<link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
    crossorigin="anonymous"/>`);

    mywindow.document.write("</head><body >");
    mywindow.document.write(`<h1>Relatório de Trocas:</h1><hr />`);
    mywindow.document.write(document.getElementById("relatorio").innerHTML);
    mywindow.document.write("</body></html>");

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus();

    mywindow.print();
    //mywindow.close();
  };

  return (
    <Fragment>
      <div className="mt-3">
        <h1>Relatório de Trocas:</h1>
        <hr />
        <Alert />
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
        <div className="col-12">
          {dataInicial && dataFinal && relatorio && relatorio.length > 0 ? (
            <div>
              <div className="col-12" id="relatorio">
                <h4>
                  Trocas Registradas no Período de:{" "}
                  <Moment format="DD/MM/YYYY">{dataInicial}</Moment> a{" "}
                  <Moment format="DD/MM/YYYY">{dataFinal}</Moment>
                </h4>
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Data</th>
                      <th scope="col">Patrimônio</th>
                      <th scope="col">Modelo</th>
                      <th scope="col">Localização</th>
                      <th scope="col">Toner</th>
                      <th scope="col">Código Toner</th>
                      <th scope="col">Total A3</th>
                      <th scope="col">Total A4</th>
                      <th scope="col">Usuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {relatorio.map((rel) => {
                      return (
                        <tr key={rel._id}>
                          <td>
                            <Moment format="DD/MM/YYYY">{rel.date}</Moment>
                          </td>
                          <td>{rel.patrimonio}</td>
                          <td>{rel.modeloImpressora}</td>
                          <td>{rel.localizacao}</td>
                          <td>{rel.corToner}</td>
                          <td>{rel.codigoToner}</td>
                          <td>{rel.totalA3}</td>
                          <td>{rel.totalA4}</td>
                          <td>{rel.usuario}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="col-5">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          colSpan="2"
                          style={{ textAlign: "center" }}
                        >
                          Totais de Toners Trocados
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Toners Pretos Trocados:</td>
                        <td>
                          {
                            relatorio
                              .map((rel) => rel.corToner)
                              .filter((corToner) => corToner == "Preto").length
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Toners Amarelos Trocados:</td>
                        <td>
                          {
                            relatorio
                              .map((rel) => rel.corToner)
                              .filter((corToner) => corToner == "Amarelo")
                              .length
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Toners Cianos Trocados:</td>
                        <td>
                          {
                            relatorio
                              .map((rel) => rel.corToner)
                              .filter((corToner) => corToner == "Ciano").length
                          }
                        </td>
                      </tr>
                      <tr>
                        <td>Toners Magentas Trocados:</td>
                        <td>
                          {
                            relatorio
                              .map((rel) => rel.corToner)
                              .filter((corToner) => corToner == "Mangenta")
                              .length
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-12 d-flex justify-content-center">
                <button
                  id="limpar"
                  className="btn btn-lg btn-red ml-4"
                  onClick={(e) => {
                    printPDF(e);
                  }}
                >
                  Imprimir
                </button>
              </div>
            </div>
          ) : (
            <span className="ml-3 bg-danger text-light pr-2">
              * Selecione um período para exibir{" "}
            </span>
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
