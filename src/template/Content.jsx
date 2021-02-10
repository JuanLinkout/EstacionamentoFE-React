import React, { Component } from 'react';

import Routes from '../routes';

import './Content.css';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="content">
        <Routes />
      </div>
    );
  }
}