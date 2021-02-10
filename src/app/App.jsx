import React from 'react';
import Estacionamento from '../components/Estacionamento';
import { BrowserRouter } from "react-router-dom";

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Estacionamento />
      </BrowserRouter>
    </div>
  );
}

export default App;
