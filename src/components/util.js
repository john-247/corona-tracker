import React from "react";
import numeral from "numeral";
import { Circle, CircleMarker, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#cc1034",
    multiplier: 120,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 160,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 240,
  },
};

export const showDataOnMap = (data, casesType = "cases") => {
  const cir = data.map((country) => {
    return (
      <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        radius={
          Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            />
            <div className="info-name">{country.country}</div>
            <div className="info-confirmed">
              Cases: {numeral(country.cases).format("0,0")}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    );
  });

  return cir;
};

export const prettyPrintStat = (stat) => {
  return stat ? `+${numeral(stat).format("0.0a")}` : "+0";
};
