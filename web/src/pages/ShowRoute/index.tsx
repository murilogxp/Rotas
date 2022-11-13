import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../App";
import { Link, useLocation } from "react-router-dom";

import "../styles/main.css";

const ShowRoute = () => {
  const location = useLocation();
  const clients = location.state;
  const origin = {
    lat: Number(clients[0].lat),
    lng: Number(clients[0].lng),
  };
  const destination = {
    lat: Number(clients[clients.length - 1].lat),
    lng: Number(clients[clients.length - 1].lng),
  };
  const waypoints: any = [];
  const [toggleListView, setToggleListView] = useState(false);
  const [initialPosition, setInitialPosition] = useState({
    lat: -21.350653,
    lng: -46.5276895,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [response, setResponse] =
    useState<google.maps.DistanceMatrixResponse | null>(null);

  for (let c = 1; c < clients.length - 1; c++) {
    waypoints.push({
      location: {
        lat: Number(clients[c].lat),
        lng: Number(clients[c].lng),
      },
    });
  }

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map);
  };

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin: origin,
        destination: destination,
        waypoints: waypoints,
        travelMode: "DRIVING",
      };
    }, []);

  const directionsCallback = React.useCallback((res: any) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
      getRouteInstructions(res.routes[0].legs);
    } else {
      console.log(res);
    }
  }, []);

  const getRouteInstructions = (legs: any) => {
    let step;
    let steps = [];
    let legS = [];

    for (let c = 0; c < legs.length; c++) {
      for (let c1 = 0; c1 < legs[c].steps.length; c1++) {
        step = legs[c].steps[c1].instructions.replaceAll("<b>", "");
        step = step.replaceAll("</b>", "");
        step = step.replaceAll(`<div style="font-size:0.9em">`, ". ");
        step = step.replaceAll("</div>", "");
        step = step.replaceAll("/<wbr/>", " ");

        steps.push(step);
      }
      legS.push(steps);
      steps = [];
    }

    const div = document.querySelector(".legs");

    legS.forEach((leg) => {
      let li = document.createElement("li");

      leg.forEach((step: string) => {
        let p = document.createElement("p");
        let pContent = document.createTextNode(step);

        p.appendChild(pContent);
        li.appendChild(p);
      });

      div?.appendChild(li);
    });
  };

  let googleMapsLink = "https://www.google.com/maps/dir/";

  googleMapsLink = googleMapsLink.concat(`${origin.lat},${origin.lng}/`);

  waypoints.forEach((waypoint: { location: any; lat: any; lng: any }) => {
    googleMapsLink = googleMapsLink.concat(
      `${waypoint.location.lat},${waypoint.location.lng}/`
    );
  });

  googleMapsLink = googleMapsLink.concat(
    `${destination.lat},${destination.lng}/`
  );

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  const tggListView = () => {
    if (toggleListView === false) {
      setToggleListView(true);
    } else {
      setToggleListView(false);
    }
  };

  return (
    <div id="page-show-route">
      <div className="content">
        <header>
          <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
          <p>
            <Link to="/">Home</Link>
            <span>{" > "}</span>
            <Link to="/chooseClients">
              Selecionar Clientes para Montagem de Rota
            </Link>
            <span>{" > "}</span>
            <strong>Mostrar Rota</strong>
          </p>
        </header>
        <main>
          <div className="info">
            <h1>Mostrar Rota</h1>
            <div id="clientOptions">
              <button id="toggleListView" onClick={tggListView}>
                Lista de Pontos
              </button>
              <a href={googleMapsLink} target="blank">
                <button id="googleMapsLink">
                  Verificar Rota em 'maps.google'
                </button>
              </a>
            </div>
          </div>
          <div className="routeMap">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                onLoad={onMapLoad}
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={initialPosition}
                zoom={15}
                clickableIcons={false}
                mapTypeId={"hybrid"}
              >
                <DirectionsService
                  options={directionsServiceOptions}
                  callback={directionsCallback}
                />
                {response && directionsRendererOptions && (
                  <DirectionsRenderer options={directionsRendererOptions} />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
          {toggleListView ? (
            <div className="clientsList">
              <h1>Lista de Pontos</h1>
              <ul className="orderedClients">
                {clients.map((client: any) => (
                  <li key={client.id}>
                    <p>{client.name}</p>
                    <p>{client.reference}</p>
                    <p>{client.contact}</p>
                    <p>
                      <strong>{client.city}</strong>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div className="routeInstructions">
            <h1>Instruções da Rota</h1>
            <ul className="legs"></ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShowRoute;
