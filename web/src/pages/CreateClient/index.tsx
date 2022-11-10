import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ClientMap from "../ClientMap";

import "./styles.css";

const CreateClient = () => {
  const [addressFromMap, setAddressFromMap] = useState<string>("");
  const [latFromMap, setLatFromMap] = useState<string>("");
  const [lngFromMap, setLngFromMap] = useState<string>("");
  const [formData, setFormData] = useState({
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

    setFormData((old) => ({ ...formData, [name]: value }));
    setFormData((old) => ({ ...old, lat: latFromMap }));
    setFormData((old) => ({ ...old, lng: lngFromMap }));
    setFormData((old) => ({ ...old, address: addressFromMap }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, reference, contact, address, city, lat, lng, extraInfos } =
      formData;

    const data = {
      name,
      reference,
      contact,
      address,
      city,
      lat,
      lng,
      extraInfos,
    };
    await api.post("client", data);

    alert("Cliente Criado!");

    navigate("/");
  }

  return (
    <div id="page-create-client">
      <header>
        <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        <p>
          <Link to="/">Home</Link> {"->"} Cadastrar Cliente
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Cadastro de Cliente</h1>
        <fieldset>
          <legend>Dados Pessoais</legend>
          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
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
              required
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Localização</legend>
          <div className="map">
            <p>Selecione o local no mapa</p>
            <ClientMap
              handleAddressFromMap={handleAddressFromMap}
              handleLatLngFromMap={handleLatLngFromMap}
            />
          </div>
          <div className="field">
            <label htmlFor="city">Área (sigla)</label>
            <input
              type="text"
              name="city"
              id="city"
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
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
};

export default CreateClient;
