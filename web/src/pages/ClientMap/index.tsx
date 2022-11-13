import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  MarkerF,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import { GOOGLE_MAPS_API_KEY } from "../../App";

type ClientMapProps = {
  handleAddressFromMap: (address: string) => void;
  handleLatLngFromMap: (latLng: string) => void;
  newLatLngFromClient?: string;
};

const ClientMap = ({
  handleAddressFromMap,
  handleLatLngFromMap,
  newLatLngFromClient,
}: ClientMapProps) => {
  const [initialPosition, setInitialPosition] = useState({
    lat: -21.350653,
    lng: -46.5276895,
  });
  const [map, setMap] = useState<google.maps.Map>();
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [marker, setMarker] = useState<any>();

  useEffect(() => {
    if (newLatLngFromClient) {
      const lat = Number(
        newLatLngFromClient.substring(0, newLatLngFromClient.indexOf("/"))
      );
      const lng = Number(
        newLatLngFromClient.substring(newLatLngFromClient.indexOf("/") + 1)
      );

      setInitialPosition({
        lat: lat,
        lng: lng,
      });
      setMarker({
        lat: lat,
        lng: lng,
      });
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setInitialPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const loadMap = (map: google.maps.Map) => {
    setMap(map);
  };

  const loadSearchBox = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref);
  };

  const handleChangePlaces = () => {
    const places = searchBox!.getPlaces();
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    };
    setMarker(location);
    map?.panTo(location);
    handleAddressFromMap(place.formatted_address ?? "");
    handleLatLngFromMap(
      `${place.geometry?.location?.lat()}/${place.geometry?.location?.lng()}`
    );
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    setMarker({
      lat: e.latLng?.lat(),
      lng: e.latLng?.lng(),
    });
    handleLatLngFromMap(`${e.latLng?.lat()}/${e.latLng?.lng()}`);
  };

  return (
    <div id="page-client-map">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
        <GoogleMap
          onLoad={loadMap}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={initialPosition}
          zoom={15}
          clickableIcons={false}
          mapTypeId={"hybrid"}
          onClick={handleMapClick}
        >
          <StandaloneSearchBox
            onLoad={loadSearchBox}
            onPlacesChanged={handleChangePlaces}
          >
            <input
              className="address"
              type="text"
              placeholder="Busque por um Endereço"
            />
          </StandaloneSearchBox>
          <MarkerF position={marker} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ClientMap;
