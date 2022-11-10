import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import ClientMap from "../ClientMap";

import "./styles.css";

const Client = () => {
  const { id } = useParams();
  const nameField = document.querySelector("input#name");
  const referenceField = document.querySelector("input#reference");
  const contactField = document.querySelector("input#contact");
  const addressField = document.querySelector("input#address");
  const latField = document.querySelector("input#lat");
  const lngField = document.querySelector("input#lng");
  const cityField = document.querySelector("input#city");
  const extraInfosField = document.querySelector("input#extraInfos");
  const submitButton = document.querySelector("button#submit");
  const [addressFromMap, setAddressFromMap] = useState<string>("");
  const [latFromMap, setLatFromMap] = useState<string>("");
  const [lngFromMap, setLngFromMap] = useState<string>("");
  const [showDivMap, setShowDivMap] = useState(true);
  const [client, setClient] = useState({
    id: 0,
    name: "",
    reference: "",
    contact: "",
    address: "",
    city: "",
    lat: "",
    lng: "",
    extraInfos: "",
  });

  const navigate = useNavigate();

  function handleAddressFromMap(address: string) {
    setAddressFromMap(address);
  }

  function handleLatLngFromMap(latLng: string) {
    const lat = latLng.substring(0, latLng.indexOf("/"));
    const lng = latLng.substring(latLng.indexOf("/") + 1);
    setLatFromMap(lat);
    setLngFromMap(lng);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setClient((old) => ({ ...client, [name]: value }));
    setClient((old) => ({ ...old, lat: latFromMap }));
    setClient((old) => ({ ...old, lng: lngFromMap }));
    setClient((old) => ({ ...old, address: addressFromMap }));
  }

  const handleUpdateClient = () => {
    nameField?.removeAttribute("disabled");
    referenceField?.removeAttribute("disabled");
    contactField?.removeAttribute("disabled");
    addressField?.removeAttribute("disabled");
    setShowDivMap(false);
    latField?.removeAttribute("disabled");
    lngField?.removeAttribute("disabled");
    cityField?.removeAttribute("disabled");
    extraInfosField?.removeAttribute("disabled");
    submitButton?.removeAttribute("disabled");
  };

  const handleDeleteClient = () => {
    let confirmDelete = window.confirm(`Usuário ${client.name} será excluído`);
    if (confirmDelete) {
      api.delete(`client/${id}`).then((response) => {
        if (response.data.statusCode == 200) {
          alert("Cliente Excluído com Sucesso");
          navigate("/clients");
        }
      });
    }
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const {
      id,
      name,
      reference,
      contact,
      address,
      city,
      lat,
      lng,
      extraInfos,
    } = client;

    const data = {
      id,
      name,
      reference,
      contact,
      address,
      city,
      lat,
      lng,
      extraInfos,
    };

    await api.put(`client`, data).then((response) => {
      if (response.data.statusCode == 200) {
        alert("Dados do Cliente Alterados com Sucesso");
        navigate("/clients");
      }
    });
  }

  useEffect(() => {
    api.get(`client/${id}`).then((response) => {
      setClient(response.data);
      setAddressFromMap(response.data.address);
      setLatFromMap(response.data.lat);
      setLngFromMap(response.data.lng);
    });
  }, []);

  return (
    <div id="page-client">
      <header>
        <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        <p>
          <Link to="/">Home</Link> {"->"}{" "}
          <Link to="/clients">Listar Clientes</Link> {"->"} Visualizar Cliente
        </p>
      </header>
      <div id="content">
        <div id="clientOptions">
          <button onClick={handleUpdateClient}>
            Habilitar Edição de Dados do Cliente
          </button>
          <button onClick={handleDeleteClient}>Excluir Cliente</button>
        </div>
        <main>
          <form onSubmit={handleSubmit} key={client?.id}>
            <h1>Dados do Cliente</h1>
            <fieldset>
              <legend>Dados Pessoais</legend>
              <div className="field">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={client?.name}
                  disabled
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="reference">Referencia</label>
                <input
                  type="text"
                  name="reference"
                  id="reference"
                  value={client?.reference}
                  disabled
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="contact">Contato</label>
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  value={client?.contact}
                  disabled
                  required
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Localização</legend>
              <p>Selecione o local no mapa</p>
              <div className="field" id="localeDiv">
                <div className="map">
                  <ClientMap
                    handleAddressFromMap={handleAddressFromMap}
                    handleLatLngFromMap={handleLatLngFromMap}
                    newLatLngFromClient={`${client.lat}/${client.lng}`}
                  />
                </div>
                {showDivMap ? <div className="hideMap"></div> : null}
              </div>
              <div className="field">
                <label htmlFor="city">Área (sigla)</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={client?.city}
                  disabled
                  required
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Informações Extras</legend>
              <div className="field">
                <label htmlFor="extraInfos">Informações Extras</label>
                <input
                  type="text"
                  name="extraInfos"
                  id="extraInfos"
                  value={client?.extraInfos}
                  disabled
                  onChange={handleInputChange}
                />
              </div>
            </fieldset>
            <button name="submit" id="submit" type="submit" disabled>
              Atualizar Dados do Cliente
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Client;
