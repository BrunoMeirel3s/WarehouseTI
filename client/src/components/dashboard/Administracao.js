import React, { Fragment, useState } from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import Alert from "../layout/Alert";
import PropTypes from "prop-types";
import Usuarios from "./adm/Usuarios";

const Administracao = (props) => {
  return (
    <Fragment>
      <ul class="nav nav-tabs mt-2" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link active text-dark"
            id="usuarios-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
          >
            Usuários
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link text-dark"
            id="impressoras-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
          >
            Impressoras
          </a>
        </li>
        <li class="nav- ">
          <a
            class="nav-link text-dark"
            id="suprimentos-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
          >
            Suprimentos
          </a>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="usuarios-tab"
        >
          <Usuarios />
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          ...
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          ...
        </div>
      </div>
    </Fragment>
  );
};

Administracao.propTypes = {};

export default Administracao;
