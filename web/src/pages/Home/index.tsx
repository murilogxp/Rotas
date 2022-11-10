import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        </header>
        <main>
          <p>Nesta página é possível:</p>
          <p>Cadastrar Clientes</p>
          <p>Listar Clientes</p>
          <p>Escolher Clientes para Montagem de Rota</p>
          <Link to="/createClient">Cadastrar Cliente</Link> <br />
          <Link to="/clients">Listar Clientes</Link> <br />
          <Link to="/chooseClients">
            Escolher Clientes para Montagem de Rota
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
