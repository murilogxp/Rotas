import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

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
    if (selectedClients.length > 0) {
      await api.post("routeRequest", selectedClients).then((response) => {
        if (response.data.statusCode === 502) {
          alert(response.data.msg);
        } else {
          navigate("/showRoute", { state: response.data });
        }
      });
    } else {
      alert("Selecione ao menos 1 ponto de entrega");
    }
  }

  return (
    <div id="page-choose-clients">
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
          <p>
            <Link to="/">Home</Link>
            <span>{" > "}</span>
            <strong>Selecionar Clientes para Montagem de Rota</strong>
          </p>
        </header>
        <main>
          <div className="info">
            <h1>Seleção de Clientes para Montagem de Rota</h1>
          </div>
          <div className="chooseCity">
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
          <div className="choosableClients">
            {clients.length > 0 ? (
              <>
                <p>
                  O primeiro ponto de entrega selecionado será considerado o
                  ponto de partida da rota
                </p>
                <div className="filteredClients">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className={
                        selectedClientsIds.includes(client.id)
                          ? "filteredClient, selected"
                          : "filteredClient"
                      }
                      onClick={() => handleSelectClient(client, client.id)}
                    >
                      <h1>{client.name}</h1>
                      <h2>{client.reference}</h2>
                      <h3>
                        {client.contact} <strong>{client.city}</strong>
                      </h3>
                    </div>
                  ))}
                </div>
                <button onClick={handleRouteRequest}>Mostrar Rota</button>
              </>
            ) : (
              <div className="noContent">
                <p>Nenhum Cliente Encontrado</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChooseClients;
