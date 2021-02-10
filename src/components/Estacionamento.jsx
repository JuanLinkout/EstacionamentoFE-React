import React, { Component } from 'react';
import Content from '../template/Content';
import Header from '../template/Header';
import Nav from '../template/Nav';

import './Estacionamento.css';

export default class Estacionamento extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="estacionamento-container">
        <Header className="top-menu" />
        <div className="body-content-container">
          <Nav />
          <Content />
        </div>
      </div>
    );
  }
}