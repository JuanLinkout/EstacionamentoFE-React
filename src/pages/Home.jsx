import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DoneIcon from '@material-ui/icons/Done';
import TurnedInIcon from '@material-ui/icons/TurnedIn';

import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.initialState };
  }

  render() {

    return (
      <div className="home-container">
        <h1>Bem vindo ao estacionamento maneiro!</h1>

        <Paper elevation={3} className="home-paper">
          <h2>O que foi desenvolvido até agora</h2>
          <div className="icon-text">
            <DoneIcon />
            <p>Frontend desenvolvido com React</p>
          </div>
          <div className="icon-text">
            <DoneIcon />           
            <p>Api Rest desenvolvida em Java com framework springboot</p>
          </div>
          <div className="icon-text">
            <DoneIcon />
            <p>Integação com banco de dados NoSQL mongoDB</p>
          </div>
          <div className="icon-text">
          <DoneIcon />
            <p>Implementar feedback visual de loading e de ações feitas com sucesso</p>
          </div>
          <div className="icon-text">
            <DoneIcon />
            <p>Melhorar os tratamentos de erros no frontend</p>
          </div>
          <div className="icon-text">
            <DoneIcon />
            <p>Implementar o sistema de busca usando query e filtros</p>
          </div>
          <div className="icon-text">
            <DoneIcon />
            <p>Melhorar os tratamentos de erros no backend</p>
          </div>

          <h2>Próximos passos</h2>
          <div className="icon-text">
            <TurnedInIcon />
            <p>Implementar o uso do Redux no projeto</p>
          </div>
          <div className="icon-text">
            <TurnedInIcon />
            <p>Desenvolver um sistema de login seguro utilizando tokens</p>
          </div>
        </Paper>
      </div>
    );
  }
}