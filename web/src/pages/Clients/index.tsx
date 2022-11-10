import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

import "./styles.css";

interface Client {
  id: number;
  name: string;
  reference: string;
  contact: string;
  address: string;
  city: string;
  lat: string;
  lon: string;
  extraInfos: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    api.get("clients").then((response) => {
      setClients(response.data);
    });
  }, []);

  return (
    <div id="page-clients">
      <header>
        <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        <p>
          <Link to="/">Home</Link> {"->"} Listar Clientes
        </p>
      </header>
      <main>
        <h1>Clientes Cadastrados</h1>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Referência</th>
              <th>Contato</th>
              <th>Área (sigla)</th>
              <th>Visualizar</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>
                  <p>{client.name}</p>
                </td>
                <td>
                  <p>{client.reference}</p>
                </td>
                <td>
                  <p>{client.contact}</p>
                </td>
                <td>
                  <p>{client.city}</p>
                </td>
                <td>
                  <Link to={`/client/${client.id}`}>
                    <button>Visualizar</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Clients;
