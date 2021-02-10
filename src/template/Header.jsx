import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import Avatar from '@material-ui/core/Avatar';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="top-menu">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" component={Link} to="/">
              <DriveEtaIcon />
            </IconButton>
            <div className="title">Estacionamento maneiro</div>
            <Avatar className="avatar-bg-color">A</Avatar>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}