import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { obterSuprimento } from "../../actions/suprimentos";
import {
  obterImpressora,
  obterImpressorasDisponiveis,
} from "../../actions/impressoras";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Trocatoner = ({
  obterSuprimento,
  suprimento,
  impressora,
  obterImpressora,
  obterImpressorasDisponiveis,
  todasImpressoras,
}) => {
  const [formData, setFormData] = useState({
    patrimonio: "",
    codigoToner: "",
    corToner: "",
    localizacao: "",
    modeloImpressora: "",
    enderecoIp: "",
    totalA3: "",
    totalA4: "",
  });

  const {
    patrimonio,
    codigoToner,
    corToner,
    localizacao,
    modeloImpressora,
    enderecoIp,
    totalA3,
    totalA4,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const getSuprimento = async (e) => {
    e.preventDefault();
    obterSuprimento(codigoToner);
  };

  useEffect(() => {
    obterImpressorasDisponiveis();
    if (suprimento) {
      setFormData({ ...formData, corToner: suprimento.cor });
    }
  }, [suprimento]);
  let optionsSelectPatrimonio;
  let i = 0;

  if (todasImpressoras && todasImpressoras.length >= 1) {
    optionsSelectPatrimonio = todasImpressoras
      .map((impressoras) => impressoras)
      .map((imp) => {
        <option value={imp.patrimonio}>Bruno</option>;
        console.log(imp.patrimonio);
      });
  } if (todasImpressoras) {
    optionsSelectPatrimonio = (
      <option value={todasImpressoras[0].patrimonio}>
        {todasImpressoras[0].patrimonio}
      </option>
    );
    console.log(todasImpressoras[0].patrimonio);
  }
  return (
    <Fragment>
      <div className="mt-3">
        <h2>Registrar troca de toner:</h2>
        <hr />

        <div className="col-12 d-flex">
          <div className="form-group col-4">
            <label className="label" for="patrimonio">
              Patrimônio
            </label>
            <select
              className="form-control"
              name="patrimonio"
              value={patrimonio}
              onChange={(e) => onChange(e)}
            >
              {optionsSelectPatrimonio}
            </select>
          </div>
          <div className="form-group col-4">
            <form onSubmit={getSuprimento}>
              <label className="label" for="tonerTrocado">
                Código Toner:
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="codigoToner"
                  value={codigoToner}
                  onChange={(e) => onChange(e)}
                />
                <div className="input-group-prepend">
                  <button type="submit" className="btn btn-red">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <form action="">
          <div className="col-12 mb-2 d-flex">
            <div className="col-4">
              <label className="label" for="patrimonio">
                Cor Toner:
              </label>
              <input
                type="text"
                className="form-control"
                name="corToner"
                value={corToner}
                onChange={(e) => onChange(e)}
                disabled
              />
            </div>
            <div className="form-group col-7">
              <label className="label" for="patrimonio">
                Localização:
              </label>
              <input type="text" className="form-control" id="localizacao" />
            </div>
          </div>

          <div className="col-12 d-flex">
            <div className="form-group col-4">
              <label className="label" for="modeloImpressora">
                Modelo Impressora:
              </label>
              <input
                type="text"
                className="form-control"
                name="modeloImpressora"
                value={modeloImpressora}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group col-4">
              <label className="label" for="enderecoIp">
                Endereço IP:
              </label>
              <input
                type="text"
                className="form-control"
                name="enderecoIp"
                value={enderecoIp}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="col-12 ml-3">
            <span className="label-2">Totais de Impressão:</span>
          </div>
          <div className="col-12 d-flex">
            <div className="form-group col-4">
              <label className="label" for="a4">
                A4:
              </label>
              <input
                type="text"
                className="form-control"
                name="totalA4"
                value={totalA4}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group col-4">
              <label className="label" for="tray1">
                A3:
              </label>
              <input
                type="text"
                className="form-control"
                name="totalA3"
                value={totalA3}
                onChange={(e) => onChange(e)}
              />
            </div>
          </div>
          <div className="col-8 d-flex justify-content-center mb-4">
            <button
              type="submit"
              id="registrar"
              className="btn btn-lg btn-red mr-4"
            >
              Registrar
            </button>
            <button id="limpar" className="btn btn-lg btn-red ml-4">
              Limpar
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
Trocatoner.propTypes = {
  obterSuprimento: PropTypes.func.isRequired,
  obterImpressora: PropTypes.func.isRequired,
  obterImpressorasDisponiveis: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  suprimento: state.suprimentos.suprimento,
  impressora: state.impressoras.impressora,
  todasImpressoras: state.impressoras.todasImpressoras,
});
export default connect(mapStateToProps, {
  obterSuprimento,
  obterImpressora,
  obterImpressorasDisponiveis,
})(Trocatoner);
