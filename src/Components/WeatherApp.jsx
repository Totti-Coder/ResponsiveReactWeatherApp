import sunny from "../assets/images/sunny.png";
import cloudy from "../assets/images/cloudy.png";
import rainy from "../assets/images/rainy.png";
import snowy from "../assets/images/snowy.png";
import { useState, useEffect } from "react";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      const defaultLocation = "Madrid";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&appid=${apiKey}&units=metric&lang=es`;
      const res = await fetch(url);
      const defaultData = await res.json();
      setData(defaultData);
    };
    fetchDefaultWeather();
  }, []);

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };

  const search = async () => {
    if (location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`;
      const res = await fetch(url);
      const searchData = await res.json();
      if (searchData.cod !== 200) {
        // cod es un elemento de la respuesta que si nos da 200 es que todo ha funcionado correctamente
        setData({ notFound: true });
      } else {
        console.log(searchData);
        setData(searchData);
        setLocation("");
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  const backgroundImages = {
    Clear: "linear-gradient(to right, #ff8c42, #fcd283)",
    Clouds: "linear-gradient(to right, #4bc5c3 , #97f4f2)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #ff8c42, #fcd283)",
    Mist: "linear-gradient(to right, #e0e0e0, #b8c6db)",
  };

  const backgroundImage = data.weather
    ? backgroundImages[data.weather[0].main]
    : "linear-gradient(to right, #ff8c42, #fcd283)";

  const currentDate = new Date();

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mier", "Juev", "Vier", "Sab"];

  const months = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "Ma",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const month = months[currentDate.getMonth()];
  const dayOfMonth = currentDate.getDate();

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month} `;

  return (
    <div className="container" style={{ backgroundImage }}>
      <div
        className="weather-app"
        style={{
          backgroundImage:
            backgroundImage && backgroundImage.replace
              ? backgroundImage.replace("to right", "to top")
              : null,
        }}
      >
        <div className="search">
          <div className="search-top">
            <i className="fa-solid fa-location-dot"></i>
            <div className="location">{data.name}</div>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Busca una ubicación"
              value={location}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
          </div>
        </div>
        {data.notFound ? (<div className="not-found">Sin Resultado 😒</div>) : (
          <>
          <div className="weather">
          <img src={weatherImage} alt="sunny" />
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temp">
            {data.main ? `${Math.floor(data.main.temp)}°` : null}
          </div>
        </div>
        <div className="weather-date">
          <p>{formattedDate}</p>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humedad</div>
            <i className="fa-solid fa-droplet"></i>
            <div className="data">{data.main ? data.main.humidity : null}%</div>
          </div>
          <div className="wind">
            <div className="data-name">Viento</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">{data.wind ? data.wind.speed : null}km/h</div>
          </div>
        </div>
        </>
        )}
        
      </div>
    </div>
  );
};

export default WeatherApp;
