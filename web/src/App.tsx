import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
//AIzaSyCZLR2bqK7uTI8EsLBP8kSoxH34QYyBMx4 key google
//aula 2 00:25:00 body params (escolha das clientes para montagem de rota)
//aula 3 00:50:00

import MainRoutes from './routes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;
