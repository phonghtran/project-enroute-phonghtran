import React, { Component } from "react";

import {
  Cloud,
  CloudRain,
  CloudSnow,
  Drop,
  Lightning,
  Sun,
} from "phosphor-react";

const sampleAPICall = {
  coord: {
    lon: -122.08,
    lat: 37.39,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  base: "stations",
  main: {
    temp: 65,
    feels_like: 281.86,
    temp_min: 280.37,
    temp_max: 284.26,
    pressure: 1023,
    humidity: 100,
  },
  visibility: 16093,
  wind: {
    speed: 1.5,
    deg: 350,
  },
  clouds: {
    all: 1,
  },
  dt: 1560350645,
  sys: {
    type: 1,
    id: 5122,
    message: 0.0139,
    country: "US",
    sunrise: 1560343627,
    sunset: 1560396563,
  },
  timezone: -25200,
  id: 420006353,
  name: "Mountain View",
  cod: 200,
};

class CardWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: sampleAPICall,
      isLoaded: true,
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    // let { isLoaded } = this.state;
    // if (this.props.deliveryAPILoaded && !isLoaded) {
    //   const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API}`;
    //   fetch(apiURL)
    //     .then((response) => response.json())
    //     .then((json) => {
    //       console.log(json);
    //       this.setState({
    //         items: json,
    //         isLoaded: true,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }

  cardinalDirections = (deg) => {
    if (deg === 0) {
      return "N";
    } else if (deg === 90) {
      return "E";
    } else if (deg === 180) {
      return "S";
    } else if (deg === 270) {
      return "W";
    } else if (deg > 0 && deg < 90) {
      return "NE";
    } else if (deg > 90 && deg < 180) {
      return "SE";
    } else if (deg > 180 && deg < 270) {
      return "SW";
    } else if (deg > 270 && deg < 360) {
      return "NW";
    }
  };

  FToC = (temp) => {
    return Math.round((temp - 32) / 1.8);
  };

  render() {
    let { items, isLoaded } = this.state;

    if (isLoaded && items) {
      return (
        <div>
          <h2>Weather</h2>
          <div className="d-md-flex ">
            <div className="weatherIcon__container">
              <WeatherIcon items={items}></WeatherIcon>
            </div>

            <div>
              <h4 className="--label">{items.weather[0].main}</h4>
              {items.main.temp}&deg;F / {this.FToC(items.main.temp)}&deg;C
              <br />
              {this.cardinalDirections(items.wind.deg)}&nbsp;
              {items.wind.speed} m/s
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Weather data loading or not available</div>;
    }
  }
}

class WeatherIcon extends Component {
  render() {
    const weatherId = this.props.items.weather[0].id;
    const mainCategory = weatherId.toString().charAt(0);

    console.log(weatherId, mainCategory);

    const iconSize = 48;

    if (mainCategory === "7" || weatherId > 800) {
      return <Cloud color="white" size={iconSize} weight="bold" />;
    } else if (mainCategory === "6") {
      return <CloudSnow color="white" size={iconSize} weight="bold" />;
    } else if (mainCategory === "5") {
      return <Drop color="white" size={iconSize} weight="bold" />;
    } else if (mainCategory === "3") {
      return <CloudRain color="white" size={iconSize} weight="bold" />;
    } else if (mainCategory === "2") {
      return <Lightning color="white" size={iconSize} weight="bold" />;
    }

    return <Sun color="white" size={iconSize} weight="bold" />;
  }
}

export default CardWeather;
