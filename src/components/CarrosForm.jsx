import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Loader from '../components/Loader';
import AlertBar from '../components/AlertBar';

import './CarrosForm.css';

export default class CarrosForm extends Component {
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
      buttonDisabled: false,
      loading: false,
    }

    this.state = { ...this.initialState };
  }

  handleInputChange = (e) => {
    this.setState({ carros: { ...this.state.carros, [e.target.id]: e.target.value } });
  };

  handleAddButtonClick = async (e) => {
    const { ...payload } = this.state.carros;
    const error = [];

    // Verifica se os campos são requeridos.
    if (this.props.required) {
      // Verifica quais campos faltam ser preenchidos.
      Object.keys(payload).forEach(key => {
        if (!payload[key]) {
          error.push(key);
        }
      });
      console.log('oi')
      this.setState({ error: [...error] });

      // Caso exista alguma componente aqui dentro é porque faltou preencher
      if (error.length) {
        this.setState({ alertBar: { open: true, text: 'Campos não preenchidos!', type: 'warning' } });
        return;
      }
    }

    // Bloco responsavel por setar a mensagem de erro ou de sucesso, e no final limpar definir como true a condição do popup.
    try {
      this.setState({ buttonDisabled: true, loading: true });
      await this.props.callback(payload);
      this.setState({ alertBar: { ...this.state.alertBar, text: this.props.message, type: 'success' } });
      this.clearFields();
    } catch (e) {
      this.setState({ alertBar: { ...this.state.alertBar, text: 'Aconteceu um erro!', type: 'error' } });
    } finally {
      this.setState({ alertBar: { ...this.state.alertBar, open: true }, buttonDisabled: false, loading: false });
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

  async componentDidMount() {
    if (this.props.getCarValues) {
      const result = await this.props.getCarValues();
      this.setState({ carros: { ...result } });
    }
  }

  render() {
    const { open, text, type } = this.state.alertBar;
    const { ...valores } = this.state.carros;
    const error = [...this.state.error];
    const { buttonDisabled, loading } = this.state;

    return (
      <div className="carros-form">
        <h1>Formulario de registro de Carro</h1>

        <AlertBar open={open} callback={this.handleCloseAlert} text={text} type={type} />

        <Paper elevation={3} className="input-paper">
          <div className="input-area">
            {Object.keys(valores).map(key => {
              return key !== 'id' && (
                <Box key={key} m={1}>
                  <TextField error={error.includes(key) ? true : false} helperText={error.includes(key) ? "Campo obrigatório" : ""} required={this.props.required} id={key} label={key.toUpperCase()} onChange={this.handleInputChange} value={this.state.carros[key]} variant="outlined" className="input-text" />
                </Box>
              );
            })}
          </div>
          <div className="button-area">
            <Box m={1}>
              <Button variant="contained" disabled={buttonDisabled} color="primary" onClick={this.handleAddButtonClick}>
                {this.props.firstButtonText}
              </Button>
            </Box>

            <Box m={1}>
              <Button variant="contained" disabled={buttonDisabled} onClick={this.handleResetButtonClick}>
                Resetar
              </Button>
            </Box>
          </div>
        </Paper>

        {
          loading &&
            <Loader margin={3} size="5rem" />
        }
      </div>
    );
  }
}