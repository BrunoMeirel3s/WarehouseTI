import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { obterSuprimento } from "../../actions/suprimentos";
import { obterImpressorasDisponiveis } from "../../actions/impressoras";
import { registrarTroca } from "../../actions/registrartroca";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Alert from "../layout/Alert";

const Trocatoner = ({
  obterSuprimento,
  suprimento,
  obterImpressorasDisponiveis,
  todasImpressoras,
  registrarTroca,
}) => {
  if (document.getElementById("registrartroca")) {
    document.getElementById("registrartroca").classList.add = "menu-active";
  }
  const [formData, setFormData] = useState({
    patrimonio: "",
    codigoToner: "",
    corToner: "",
    localizacao: "",
    modelo: "",
    enderecoIp: "",
    totalA3: "",
    totalA4: "",
  });

  const {
    patrimonio,
    codigoToner,
    corToner,
    localizacao,
    modelo,
    enderecoIp,
    totalA3,
    totalA4,
  } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    registrarTroca(
      patrimonio,
      codigoToner,
      corToner,
      localizacao,
      modelo,
      enderecoIp,
      totalA3,
      totalA4
    );
  };
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangePatrimonio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getSuprimento = async (e) => {
    e.preventDefault();
    obterSuprimento(codigoToner);
  };

  useEffect(() => {
    if (suprimento) {
      setFormData({ ...formData, corToner: suprimento.cor });
    }
  }, [suprimento]);

  useEffect(() => {
    obterImpressorasDisponiveis();
  }, []);

  useEffect(() => {
    if (todasImpressoras && patrimonio !== 0) {
      todasImpressoras.map((imp) => {
        if (imp.patrimonio === patrimonio) {
          setFormData({
            ...formData,
            enderecoIp: imp.enderecoIp,
            modelo: imp.modelo,
            localizacao: imp.localizacao,
          });
        }
        if (imp.patrimonio === patrimonio && !imp.enderecoIp) {
          setFormData({
            ...formData,
            enderecoIp: "",
            modelo: imp.modelo,
            localizacao: imp.localizacao,
          });
        }
      });
    }
  }, [patrimonio]);

  const limparFormulario = () => {
    document.getElementById("codigoToner").disabled = false;
    setFormData({
      ...formData,
      patrimonio: "",
      codigoToner: "",
      corToner: "",
      localizacao: "",
      modelo: "",
      enderecoIp: "",
      totalA3: "",
      totalA4: "",
    });
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <div className="mt-3">
        <h1>Registrar Troca de Toner:</h1>
        <hr />
        <Alert />
        <div className="col-12 d-flex">
          <div className="col-4">
            <label className="label" for="patrimonio">
              Patrimônio
            </label>
            <select
              className="form-control"
              name="patrimonio"
              value={patrimonio}
              onChange={(e) => onChangePatrimonio(e)}
            >
              <option value={0}> - Selecione</option>
              {todasImpressoras && todasImpressoras.length > 0 ? (
                todasImpressoras.map((impressora) => {
                  return (
                    <option key={impressora._id} value={impressora.patrimonio}>
                      {impressora.patrimonio}
                    </option>
                  );
                })
              ) : (
                <option value={0}>Não Disponível</option>
              )}
            </select>
          </div>
          <div className="form-group col-4">
            <form onSubmit={getSuprimento}>
              <label className="label" for="tonerTrocado">
                Código Toner:
              </label>
              <div className="input-group">
                <input
                  id="codigoToner"
                  type="text"
                  className="form-control"
                  name="codigoToner"
                  value={codigoToner}
                  onChange={(e) => onChange(e)}
                  disabled={corToner}
                  required
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
        <form onSubmit={onSubmit}>
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
                readOnly
              />
            </div>
            <div className="form-group col-7">
              <label className="label" for="patrimonio">
                Localização:
              </label>
              <input
                type="text"
                className="form-control"
                id="localizacao"
                value={localizacao}
                readOnly
              />
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
                value={modelo}
                readOnly
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
                readOnly
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
                required
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
                required
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
      </div>
    </Fragment>
  );
};
Trocatoner.propTypes = {
  obterSuprimento: PropTypes.func.isRequired,
  obterImpressorasDisponiveis: PropTypes.func.isRequired,
  registrarTroca: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  suprimento: state.suprimentos.suprimento,
  todasImpressoras: state.impressoras.todasImpressoras,
});
export default connect(mapStateToProps, {
  obterSuprimento,
  obterImpressorasDisponiveis,
  registrarTroca,
})(Trocatoner);
