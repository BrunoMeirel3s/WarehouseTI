import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Alert from "../layout/Alert";

const Relatorios = ({}) => {
  const [formData, setFormData] = useState({
    dataInicial: "",
    dataFinal: "",
  });

  const {dataInicial, dataFinal } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <div className="mt-3">
        <h1>Relatório de Trocas:</h1>
        <hr />
        <Alert />
        <div className="col-12 d-flex">
          <form className="form-group d-flex" onSubmit={e=> onSubmit(e)}>
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
      </div>
    </Fragment>
  );
};
Relatorios.propTypes = {};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(Relatorios);
