import React, { Fragment, useState } from "react";
import { Link, Redirect, Switch } from "react-router-dom";

const TrocaToner = () => {
  return (
    <Fragment>
      <div class="mt-3">
        <h2>Registrar troca de toner:</h2>
        <hr />
        <form action="">
          <div class="col-12 d-flex">
            <div class="form-group col-4">
              <label class="label" for="patrimonio">
                Patrimônio
              </label>
              <select class="form-control" id="patrimonio">
                <option value="70GH">70GH</option>
                <option value="68GH">68GH</option>
              </select>
            </div>
            <div class="form-group col-4">
              <label class="label" for="tonerTrocado">
                Código Toner:
              </label>
              <input type="text" class="form-control" id="codigoToner" />
            </div>
          </div>
          <div class="col-12 mb-2 d-flex">
            <div class="col-4">
              <label class="label" for="patrimonio">
                Cor Toner:
              </label>
              <input type="text" class="form-control" id="corToner" readonly />
            </div>
            <div class="form-group col-7">
              <label class="label" for="patrimonio">
                Localização:
              </label>
              <input
                type="text"
                class="form-control"
                id="localizacao"
                readonly
              />
            </div>
          </div>

          <div class="col-12 d-flex">
            <div class="form-group col-4">
              <label class="label" for="modeloImpressora">
                Modelo Impressora:
              </label>
              <input
                type="text"
                class="form-control"
                id="modeloImpressora"
                readonly
              />
            </div>
            <div class="form-group col-4">
              <label class="label" for="enderecoIp">
                Endereço IP:
              </label>
              <input
                type="text"
                class="form-control"
                id="enderecoIp"
                readonly
              />
            </div>
          </div>
          <div class="col-12 ml-3">
            <span class="label-2">Totais de Impressão:</span>
          </div>
          <div class="col-12 d-flex">
            <div class="form-group col-4">
              <label class="label" for="a4">
                A4:
              </label>
              <input type="text" class="form-control" id="a4" />
            </div>
            <div class="form-group col-4">
              <label class="label" for="tray1">
                A3:
              </label>
              <input type="text" class="form-control" id="a3" />
            </div>
          </div>
          <div class="col-8 d-flex justify-content-center mb-4">
            <button
              type="submit"
              id="registrar"
              class="btn btn-lg btn-red mr-4"
            >
              Registrar
            </button>
            <button id="limpar" class="btn btn-lg btn-red ml-4">
              Limpar
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default TrocaToner;
