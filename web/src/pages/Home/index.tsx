import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        </header>
        <main className="homepage">
          <div className="info">
            <h2>Nesta página é possível:</h2>
            <div className="links">
              <Link to="/createClient">Cadastrar Cliente</Link>
              <Link to="/clients">Listar Clientes</Link>
              <Link to="/chooseClients">
                Escolher Clientes para Montagem de Rota
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
