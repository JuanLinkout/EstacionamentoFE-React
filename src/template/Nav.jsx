import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StorageIcon from '@material-ui/icons/Storage';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
//import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import NoteAddIcon from '@material-ui/icons/NoteAdd';

import './Nav.css';

export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenCarros: false,
      openCustomer: false,
    };
  }

  handleClickOpenCarros = () => {
    const { isOpenCarros } = this.state;
    const updatedOpen = !isOpenCarros;
    this.setState({ isOpenCarros: updatedOpen });
  }

  /* handleClickOpenCustomer = () => {
    const { openCustomer } = this.state;
    const updatedOpen = !openCustomer;
    this.setState({ openCustomer: updatedOpen });
  } */

  render() {
    const { isOpenCarros, /* openCustomer */ } = this.state;

    return (
      <div className="side-bar">
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="nav-menu"
        >
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <HomeIcon className="icon-color" />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem button onClick={this.handleClickOpenCarros}>
            <ListItemIcon>
              <DriveEtaIcon className="icon-color" />
            </ListItemIcon>
            <ListItemText primary="Carros" />
            {isOpenCarros ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={isOpenCarros} timeout="auto" unmountOnExit>
            <List component="div"  disablePadding>
              <ListItem button component={Link} to="/carros">
                <ListItemIcon className='padding-left'>
                  <StorageIcon className="icon-color" />
                </ListItemIcon>
                <ListItemText primary="BD Carro" />
              </ListItem>

              <ListItem button className='padding-left'component={Link} to="/carros/registrar">
                <ListItemIcon className='padding-left'>
                  <NoteAddIcon className="icon-color" />
                </ListItemIcon>
                <ListItemText primary="Registrar carro" />
              </ListItem>
            </List>
          </Collapse>

          {/* <ListItem button onClick={this.handleClickOpenCustomer}>
            <ListItemIcon>
              <GroupIcon className="icon-color" />
            </ListItemIcon>
            <ListItemText primary="Customer" />
            {openCustomer ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openCustomer}  timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button component={Link} to="/customer">
                <ListItemIcon className='padding-left'>
                  <StorageIcon className="icon-color" />
                </ListItemIcon>
                <ListItemText primary="DataBase" />
              </ListItem>

              <ListItem button component={Link} to="/customer/register">
                <ListItemIcon className='padding-left'>
                  <NoteAddIcon className="icon-color" />
                </ListItemIcon>
                <ListItemText primary="Register Customer" />
              </ListItem>
            </List>
          </Collapse> */}
        </List>
      </div>
    );
  }
}



