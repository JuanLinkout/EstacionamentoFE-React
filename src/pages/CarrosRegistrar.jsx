import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import AlertBar from '../components/AlertBar';
import { addCar } from '../utils/api';

import './CarrosRegistrar.css';

export default class CarrosRegistrar extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      carros: {
        nome: '',
        modelo: '',
        cor: '',
        ano: '',
        combustivel: '',
        motor: '',
        categoria: '',
        placa: '',
        km: '',
      },
      alertBar: {
        open: false,
        type: undefined,
        text: undefined,
      },
      error: [],
    }

    this.state = { ...this.initialState };
  }

  handleInputChange = (e) => {
    this.setState({ carros: { ...this.state.carros, [e.target.id]: e.target.value } });
  };

  handleAddButtonClick = async (e) => {
    const { ...payload } = this.state.carros;
    const error = [];

    // Verifica quais campos faltam ser preenchidos.
    Object.keys(payload).forEach(key => {
      if (!payload[key]) {
        error.push(key);
      }
    });

    this.setState({ error: [ ...error ]});

    // Caso exista alguma componente aqui dentro é porque faltou preencher
    if (error.length) {
      this.setState({ alertBar: { open: true, text: 'Campos não preenchidos!', type: 'warning' } });
      return;
    }

    // Bloco responsavel por setar a mensagem de erro ou de sucesso, e no final limpar definir como true a condição do popup.
    try {
      await addCar(payload);
      this.setState({ alertBar: { ...this.state.alertBar, text:'Carro registrado com sucesso!', type: 'success' } });
      this.clearFields();
    } catch (e) {
      this.setState({ alertBar: { ...this.state.alertBar, text: 'Aconteceu um erro!', type: 'error' } });
    } finally {
      this.setState({ alertBar: { ...this.state.alertBar, open: true } });
    }
  }

  handleResetButtonClick = (e) => {
    this.clearFields();
  }

  clearFields = () => {
    this.setState({ ...this.initialState, alertBar: { ...this.state.alertBar, open: false } });
  }

  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alertBar: { ...this.state.alertBar, open: false } });
  };

  render() {
    const { open, text, type } = this.state.alertBar;
    const { ...valores } = this.state.carros;
    const error = [ ...this.state.error ];

    return (
      <div className="carros-form">
        <h1>Formulario de registro de Carro</h1>
      
        <AlertBar open={open} callback={this.handleCloseAlert} text={text} type={type} />

        <Paper elevation={3} className="input-paper">
          <div className="input-area">
            {Object.keys(valores).map(key => (
              <Box key={key} m={1}>
                <TextField error={error.includes(key) ? true : false} required id={key} label={key.toUpperCase()} onChange={this.handleInputChange} value={this.state.carros[key]} variant="outlined" className="input-text" />
              </Box>
            ))}
          </div>
          <div className="button-area">
            <Box m={1}>
              <Button variant="contained" color="primary" onClick={this.handleAddButtonClick}>
                Adicionar
              </Button>
            </Box>

            <Box m={1}>
              <Button variant="contained" onClick={this.handleResetButtonClick}>
                Resetar
              </Button>
            </Box>
          </div>
        </Paper>
      </div>
    );
  }
}