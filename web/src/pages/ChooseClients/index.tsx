import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  lng: string;
  extraInfos: string;
}

const ChooseClients = () => {
  const [city, setCity] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientsIds, setSelectedClientsIds] = useState<number[]>([]);
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    fetchData();
  };

  function fetchData() {
    api.get("clients", { params: { city: city } }).then((response) => {
      setClients(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCity(value);
  }

  function handleSelectClient(client: Client, id: number) {
    const alreadySelectedIds = selectedClientsIds.findIndex((client) => {
      return client === id;
    });
    const alreadySelected = selectedClients.findIndex((client) => {
      return client.id === id;
    });

    if (alreadySelectedIds >= 0) {
      const filteredClientsIds = selectedClientsIds.filter(
        (client) => client !== id
      );
      setSelectedClientsIds(filteredClientsIds);
    } else {
      setSelectedClientsIds([...selectedClientsIds, id]);
    }
    if (alreadySelected >= 0) {
      const filteredClients = selectedClients.filter(
        (client) => client.id !== id
      );
      setSelectedClients(filteredClients);
    } else {
      setSelectedClients([...selectedClients, client]);
    }
  }

  async function handleRouteRequest() {
    await api.post("routeRequest", selectedClients).then((response) => {
      navigate("/showRoute", { state: response.data });
    });
  }

  return (
    <div id="page-choose-clients">
      <header>
        <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        <p>
          <Link to="/">Home</Link> {"->"} Selecionar Clientes para Montagem de
          Rota
        </p>
      </header>
      <main>
        <h1>Seleção de Clientes para Montagem de Rota</h1>
        <div id="chooseCity">
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Defina a Área para a Montagem da Rota</legend>
              <div className="field">
                <label htmlFor="city">Área (sigla)</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <button type="submit">Buscar Clientes da Área</button>
          </form>
        </div>
        <div id="choosableClients">
          <ul className="filteredClients">
            {clients.map((client) => (
              <li
                key={client.id}
                className={
                  selectedClientsIds.includes(client.id) ? "selected" : ""
                }
                onClick={() => handleSelectClient(client, client.id)}
              >
                <p>
                  {client.name} {client.reference} {client.contact}{" "}
                  <strong>{client.city}</strong>
                </p>
              </li>
            ))}
          </ul>
        </div>
        <button onClick={handleRouteRequest}>Montar Rota</button>
      </main>
    </div>
  );
};

export default ChooseClients;
