import React, {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import Client from "../Client";

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
  const [selectedClients, setSelectedClients] = useState<
    {
      id: number;
      lat: string;
      lng: string;
    }[]
  >([]);

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

  function handleSelectClient(id: number, lat: string, lng: string) {
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
      setSelectedClients([...selectedClients, { id: id, lat: lat, lng: lng }]);
    }
  }

  async function handleRouteRequest() {
    //console.log(selectedClients);

    await api
      .post("routeRequest", selectedClients)
      .then((response) => console.log(response.data));
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
              <legend>Defina a Cidade para a Montagem da Rota</legend>
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <button type="submit">Buscar Clientes da Cidade</button>
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
                onClick={() =>
                  handleSelectClient(client.id, client.lat, client.lng)
                }
              >
                <p>
                  {client.name} {client.reference} {client.contact}{" "}
                  <strong>
                    {client.city} {client.id}
                  </strong>
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
