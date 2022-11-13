import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import ClientMap from "../ClientMap";

const CreateClient = () => {
  const navigate = useNavigate();
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

    if (addressFromMap) {
      try {
        await api.post("client", data).then((response) => {
          if (response.data.statusCode === 200) {
            alert(response.data.msg);
          }
        });
      } catch (error) {
        alert(`Não foi possível cadastrar o(a) cliente ${data.name}
        ${error}`);
      }
      navigate("/");
    } else {
      alert("Campo 'Busque por um Endereço' obrigatório");
    }
  }

  return (
    <div id="page-create-client">
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
          <p>
            <Link to="/">Home</Link>
            <span>{" > "}</span>
            <strong>Cadastrar Cliente</strong>
          </p>
        </header>
        <main>
          <div className="info">
            <h1>Cadastro de Cliente</h1>
          </div>
          <form onSubmit={handleSubmit}>
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
            <fieldset className="map">
              <legend>
                Localização<span>Selecione o local no mapa</span>
              </legend>
              <div className="clientMapField">
                <ClientMap
                  handleAddressFromMap={handleAddressFromMap}
                  handleLatLngFromMap={handleLatLngFromMap}
                />
              </div>
              <fieldset className="area">
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
            </fieldset>
            <fieldset>
              <legend>Extras</legend>
              <div className="field">
                <label htmlFor="extraInfos">Informações</label>
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
        </main>
      </div>
    </div>
  );
};

export default CreateClient;
