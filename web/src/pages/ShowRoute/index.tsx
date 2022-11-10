import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../App";
import { Link, useLocation } from "react-router-dom";
import "./styles2.css";

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
    } else {
      console.log(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  return (
    <div className="page-route-map">
      <header>
        <h1>Aplicação para Gerenciamento de Rotas Utilizando Grafos</h1>
        <p>
          <Link to="/">Home</Link> {"->"}{" "}
          <Link to="/chooseClients">
            Selecionar Clientes para Montagem de Rota
          </Link>{" "}
          {"->"} Montar Rota
        </p>
      </header>
      <main>
        <div className="map">
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
        <div className="">
          <ol className="filteredClients">
            {clients.map((client: any) => (
              <li key={client.id}>
                <p>
                  {client.name} {client.reference} {client.contact}{" "}
                  <strong>{client.city}</strong>
                </p>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
};

export default ShowRoute;
