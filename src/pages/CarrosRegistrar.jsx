import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import CarrosForm from '../components/CarrosForm';

import Loader from '../components/Loader';
import AlertBar from '../components/AlertBar';
import { addCar } from '../utils/api';

export default class CarrosRegistrar extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <CarrosForm callback={addCar} firstButtonText="Registrar" message="Carro registrado com sucesso!" required={true}/>
    );
  }
}