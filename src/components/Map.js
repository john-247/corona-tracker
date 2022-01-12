import React from "react";
import "../styles/Map.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  Circle,
  CircleMarker,
  Popup,
} from "react-leaflet";
import { showDataOnMap } from "./util";

const Map = ({ center, zoom, countries, casesType }) => {
  const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  };

  return (
    <div className="map">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </MapContainer>
    </div>
  );
};
export default Map;
