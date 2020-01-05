import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [newCountry, setNewCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    if (newCountry === "") {
      setCountries([]);
      return;
    }
    axios
      .get(`https://restcountries.eu/rest/v2/name/${newCountry}`)
      .then(({ data }) => {
        setCountries(data);
      })
      .catch(error => {
        setCountries([]);
      });
  }, [newCountry]);

  useEffect(() => {
    if (countries.length === 0) {
      setWeatherInfo(null);
      return;
    }
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${countries[0].capital}`
      )
      .then(({ data }) => {
        setWeatherInfo(data);
      })
      .catch(error => {
        setWeatherInfo(null);
      });
  }, [countries]);

  const changeCountry = event => {
    setNewCountry(event.target.value);
  };

  const country = () =>
    countries.map(country => (
      <li key={country.name}>
        {country.name}
        <button
          onClick={() => {
            setCountries([country]);
          }}
        >
          show
        </button>
      </li>
    ));

  const languages = languages =>
    languages.map(language => <li key={language.name}>{language.name}</li>);

  const displayCountries = () => {
    if (countries.length === 1 && weatherInfo) {
      return (
        <section>
          <h1>{countries[0].name}</h1>
          <table>
            <tbody>
              <tr>
                <td>capital</td>
                <td>{countries[0].capital}</td>
              </tr>
              <tr>
                <td>population</td>
                <td>{countries[0].population}</td>
              </tr>
            </tbody>
          </table>
          <section>
            <h2>languages</h2>
            <ul>{languages(countries[0].languages)}</ul>
          </section>
          <img
            src={countries[0].flag}
            alt={`${countries[0].name}'s flag`}
            style={{ width: "10rem" }}
          />
          {weatherInfo.current && (
            <section>
              <h2>Weather in {countries[0].name}</h2>
              <table>
                <tbody>
                  <tr>
                    <td>temperature</td>
                    <td>{weatherInfo.current.temperature}</td>
                  </tr>
                  <tr>
                    {weatherInfo.current.weather_icons.map(icon => (
                      <td key={icon}>
                        <img
                          src={icon}
                          alt={`$(weatherInfo.location.name)'s weather icon`}
                        />
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td>wind</td>
                    <td>
                      {weatherInfo.current.wind_speed} kph direction{" "}
                      {weatherInfo.current.wind_dir}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </section>
      );
    } else if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else {
      return <ul style={{ listStyle: "none", padding: "0" }}>{country()}</ul>;
    }
  };

  return (
    <>
      <div>
        find countries <input onChange={changeCountry} value={newCountry} />
      </div>
      <div>{displayCountries()}</div>
    </>
  );
};

export default App;
