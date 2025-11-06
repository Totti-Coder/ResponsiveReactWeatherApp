import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"
import {useState} from "react"


const WeatherApp = () => {
    const [data, setData] = useState({})
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const search = async () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&appid=${apiKey}&units=metric`
        const res = await fetch(url)
        const searchData = await res.json()
        console.log(searchData)
    }
  return (
    <div className="container">
        <div className="weather-app">
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">Madrid</div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Busca una ubicación"/>
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
            </div>
            <div className="weather">
                <img src={sunny} alt="sunny"/>
                <div className="weather-type">Despejado</div>
                <div className="temp">28°</div>
            </div>
            <div className="weather-date">
                <p>Jue, 6 Nov</p>
            </div>
            <div className="weather-data">
                <div className="humidity">
                    <div className="data-name">Humedad</div>
                    <i className="fa-solid fa-droplet"></i>
                    <div className="data">30%</div>
                </div>
                 <div className="wind">
                    <div className="data-name">Viento</div>
                    <i className="fa-solid fa-wind"></i>
                    <div className="data">3 km h</div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default WeatherApp;