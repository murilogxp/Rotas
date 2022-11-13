import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
          <p>
            <Link to="/">Home</Link>
            <span>{" > "}</span>
            <strong>Listar Clientes</strong>
          </p>
        </header>
        <main>
          <div className="info">
            <h1>Clientes Cadastrados</h1>
          </div>

          <table>
            <thead>
              <th>Nome</th>
              <th>Referência</th>
              <th>Contato</th>
              <th>Área (sigla)</th>
              <th>Visualizar</th>
            </thead>
            <div className="tableBody">
              {clients.length > 0 ? (
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
              ) : (
                <div className="noContent">
                  <p>Nenhum Cliente Encontrado</p>
                </div>
              )}
            </div>
          </table>
        </main>
      </div>
    </div>
  );
};

export default Clients;
