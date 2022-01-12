import React, { useEffect, useState } from "react";
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
  Table,
} from "@material-ui/core";
import Infobox from "./Infobox";
import Map from "./Map";
import Tables from "./Table";
import LineGraph from "./LineGraph";
import "../styles/app.css";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./util";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCenter, setMapCenter] = useState([51.505, -40.09]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      const resp = await fetch(`https://disease.sh/v3/covid-19/countries`);

      const data = await resp.json();

      const country = data.map((name) => {
        return { name: name.country, value: name.countryInfo.iso2 };
      });

      setTableData(data.sort((a, b) => b.cases - a.cases));
      setCountries(country);
      setMapCountries(data);
    };

    getCountries();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "Worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    if (countryCode === "Worldwide") {
      setMapCenter([51.505, -40.09]);
      setMapZoom(3);
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSelected(countryCode);
        setCountryInfo(data);
        setMapZoom(4);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={selected}
              onChange={onCountryChange}
            >
              <MenuItem key="lx" value="Worldwide">
                Worldwide
              </MenuItem>
              {countries.map((country, i) => {
                return (
                  <MenuItem key={i} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <Infobox
            active={casesType == "cases"}
            onClick={(e) => {
              setCasesType("cases");
            }}
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <Infobox
            active={casesType == "recovered"}
            onClick={(e) => {
              setCasesType("recovered");
            }}
            title="recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <Infobox
            active={casesType == "deaths"}
            onClick={(e) => {
              setCasesType("deaths");
            }}
            title="deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Tables countries={tableData} />
          <h3>Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
};
export default App;
