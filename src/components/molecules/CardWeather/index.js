import React, { Component } from "react";

import {
  Cloud,
  CloudRain,
  CloudSnow,
  Drop,
  Lightning,
  Sun,
} from "phosphor-react";

class CardWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: null,
    };

    this.checkIfDataIsLoaded = null;
  }

  componentDidMount() {
    this.prepData();
  }

  prepData = () => {
    let { items } = this.state;

    if (this.props.deliveryAPILoaded && !items) {
      window.clearTimeout(this.checkIfDataIsLoaded);

      const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${this.props.coordinates.lat}&lon=${this.props.coordinates.lng}&appid=${process.env.REACT_APP_OPENWEATHER_API}`;

      fetch(apiURL)
        .then((response) => response.json())
        .then((json) => {
          console.log("api called");
          this.setState({
            items: json,
            isLoaded: true,
          });
        })
        .catch((error) => {
          this.checkIfDataIsLoaded = window.setTimeout(() => {
            this.prepData();
          }, 30);

          console.log(error);
        });
    } else {
      this.checkIfDataIsLoaded = window.setTimeout(() => {
        this.prepData();
      }, 30);
    }
  };

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
