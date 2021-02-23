import React, { Component } from 'react';

import CarrosForm from '../components/CarrosForm';

import { getCarById, updateCar } from '../utils/api';

export default class CarrosEditar extends Component {
  constructor(props) {
    super(props);
  }

  getCarValues = async () => {
    const id = this.props.match.params.id;
    const response = await getCarById(id);
    const result = await response.json();
    return await result;
  }

  render() {

    return (
      <CarrosForm callback={updateCar} firstButtonText="Alterar" getCarValues={this.getCarValues} message="Carro alterado com sucesso!" required={true}/>
    );
  }
}