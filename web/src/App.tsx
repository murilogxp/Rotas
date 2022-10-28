import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
//aula 2 00:25:00 body params (escolha das clientes para montagem de rota)
//aula 3 01:10:00 mapa

import MainRoutes from './routes';

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;

export const GOOGLE_MAPS_API_KEY = 'AIzaSyCZLR2bqK7uTI8EsLBP8kSoxH34QYyBMx4';