import sunny from "../assets/images/sunny.png"
import cloudy from "../assets/images/cloudy.png"
import rainy from "../assets/images/rainy.png"
import snowy from "../assets/images/snowy.png"


const WeatherApp = () => {
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
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className="weather">
                <img src={sunny}   alt="sunny"/>
 
            </div>
        </div>
      
    </div>
  );
};

export default WeatherApp;