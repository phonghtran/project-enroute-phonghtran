import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

const keyColors = {
  urbanAreas: "#EEEADF",
  naturalAreas: "#e1dfda",
  parks: "#BBD19C",
  water: "#DEE7FF",
  highway: {
    fill: "#CED2DC",
    stroke: "#C9CDD9",
  },
  highway_controlled_access: {
    fill: "#BDC3D2",
    stroke: "#AEB7CE",
  },
};

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: keyColors.urbanAreas,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#C7D4FA",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: keyColors.naturalAreas,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#EEF1F9",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: keyColors.parks,
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: keyColors.highway.fill,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: keyColors.highway.stroke,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: keyColors.highway_controlled_access.fill,
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: keyColors.highway_controlled_access.stroke,
      },
    ],
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#EEEADF",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: keyColors.water,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];

class BackgroundGoogleMap extends Component {
  constructor(props) {
    super(props);

    this.googleMapObject = null;
    this.markers = [];
    this.droneMarker = null;
    this.flightPath = null;

    this.mapContainer = React.createRef();
    this.mapObject = React.createRef();
  }

  componentDidMount() {
    this.setupMap();

    this.generateMap();
  }

  componentDidUpdate() {
    this.generateMap();
  }

  setupMap = () => {
    this.googleMapObject = new this.props.google.maps.Map(
      this.mapContainer.current,
      {
        center: this.props.delivery.drone.coordinates,
        zoom: 10,
      }
    );

    const styledMapType = new this.props.google.maps.StyledMapType(mapStyle);

    this.googleMapObject.mapTypes.set("styled_map", styledMapType);
    this.googleMapObject.setMapTypeId("styled_map");
  };

  generateMap = () => {
    if (this.props.deliveryAPILoaded === true) {
      let bounds = new this.props.google.maps.LatLngBounds();

      const points = [
        {
          coordinates: this.props.delivery.sender.coordinates,
          iconURL: "/assets/mapIcons/mapIcon_home.png",
        },

        {
          coordinates: this.props.delivery.recipient.coordinates,
          iconURL: "/assets/mapIcons/mapIcon_destination.png",
        },
      ];
      const map = this.googleMapObject;
      let count = 0;

      points.forEach((point) => {
        bounds.extend(point.coordinates);

        const image = {
          url: point.iconURL,
          size: new this.props.google.maps.Size(64, 64),
          origin: new this.props.google.maps.Point(0, 0),
          anchor: new this.props.google.maps.Point(32, 32),
        };

        this.markers[count] = new this.props.google.maps.Marker({
          position: point.coordinates,
          map,
          icon: image,
        });

        count++;
      });

      ///assets/mapIcons/mapIcon_drone.png

      this.droneMarker = {
        path: this.props.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        strokeColor: "#8296CC",
      };

      if (this.flightPath) {
        this.flightPath.setMap(null);
      }

      this.flightPath = new this.props.google.maps.Polyline({
        path: [points[0]["coordinates"], points[1]["coordinates"]],
        geodesic: true,
        icons: [
          {
            icon: this.droneMarker,
            offset: this.props.delivery.progress * 100 + "%",
          },
        ],
        strokeColor: "#ffffff",
        strokeOpacity: 1.0,
        strokeWeight: 4,
      });

      this.flightPath.setMap(map);

      this.googleMapObject.fitBounds(bounds);
    }
  };

  render() {
    return (
      <div
        className="backgroundGoogleMap__container"
        ref={this.mapContainer}
      ></div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP_API,
})(BackgroundGoogleMap);
