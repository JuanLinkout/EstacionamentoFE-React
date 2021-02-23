import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import CarrosForm from '../components/CarrosForm';

import Loader from '../components/Loader';
import { getCars, deleteCar, getCarsWithFilters } from '../utils/api';
import { Link } from 'react-router-dom';

import './CarrosBD.css';

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
      rows: [],
      categories: ['Nome', 'Modelo', 'Placa', 'Ano', 'Categoria', 'Cor', 'Combustivel', 'Motor', 'Km', 'Option'],
      loading: false,
    }

    this.state = { ...this.initialState };
  }

  handleInputChange = (e) => {
    this.setState({ carros: { ...this.state.carros, [e.target.id]: e.target.value } });
  };

  handleAddButtonClick = (e) => {
    console.log(this.state);
  }

  handleResetButtonClick = (e) => {
    this.clearFields();
  }

  clearFields = () => {
    this.setState({ carros:  { ...this.initialState.carros } });
  }

  // Função responsavel por garantir que o popup vai fechar.
  handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ alertBar: { ...this.state.alertBar, open: false } });
  };

  runFetch = async () => {
    try {
      this.setState({ loading: true });
      const response = await getCars();
      const result = await response.json();
      this.setState({ rows: result });
    } catch (e) {
      this.setState({ alertBar: { open: true, text: `Error message: ${e}`, type: 'error' } });
    } finally {
      this.setState({ loading: false });
    }
  }

  handleDeleteButton = async (id) => {
    const response = await deleteCar(id);
    if (response.ok) {
      const rows = this.state.rows;
      const newRows = rows.filter(obj => obj.id !== id);
      this.setState({ rows: [...newRows], alertBar: { ...this.state.alertBar, text:'Carro removido com sucesso!', type: 'success', open: true } });
    }
  }

  getFilters = async (payload) => {
    try {
      const response = await getCarsWithFilters(payload);
      const result = await response.json();
      this.setState({ rows: result });
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount() {
    this.runFetch();
  }

  render() {
    const { rows, categories, loading } = this.state;

    return (
      <div className="carros-table-container">

        <CarrosForm message="Pesquisa feita com sucesso" firstButtonText="Procurar" callback={(payload) => this.getFilters(payload)} required={false}/>
              
        {
          loading ?
          /* Caso esteja carregando exibe o simbolo de loading */
          <Loader margin={3} size="5rem" /> :
          /* Caso contrario verifica se a lista possui algum elemento. */
          rows.length ?
          (<Paper elevation={3} className="carros-table-paper">
            <div className="carros-table-area">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {categories.map(category => (
                        <TableCell align="center" key={category}>{category}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow className="table-row" key={row.id}>
                        <TableCell> {row.nome} </TableCell>
                        <TableCell align="center">{row.modelo}</TableCell>
                        <TableCell align="center">{row.placa}</TableCell>
                        <TableCell align="center">{row.ano}</TableCell>
                        <TableCell align="center">{row.categoria}</TableCell>
                        <TableCell align="center">{row.cor}</TableCell>
                        <TableCell align="center">{row.combustivel}</TableCell>
                        <TableCell align="center">{row.motor}</TableCell>
                        <TableCell align="center">{row.km}</TableCell>
                        <TableCell align="center">
                          <IconButton edge="start" color="primary" component={Link} to={'/carros/' + row.id}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="start" color="secondary" onClick={() => this.handleDeleteButton(row.id)}>
                            <DeleteForeverIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>) :
          /* Caso esteja vazio não faz nada. */
          <h4>Erro ao carregar os carros</h4>
        }
      </div>
    );
  }
}

