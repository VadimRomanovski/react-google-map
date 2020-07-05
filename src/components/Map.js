import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
                {lat: 53.901862, lng: 27.556892},
                {lat: 53.901268, lng: 27.555197},
                {lat: 53.900914, lng: 27.556248},
                {lat: 53.900920, lng: 27.556260},
                {lat: 53.900705, lng: 27.554274},
                {lat: 53.900073, lng: 27.551313},
                {lat: 53.901122, lng: 27.555755},
                {lat: 53.900534, lng: 27.556538},
                {lat: 53.903007, lng: 27.559483},
                {lat: 53.904221, lng: 27.556822},
                {lat: 53.904303, lng: 27.543319},
                {lat: 53.908155, lng: 27.550561},
                {lat: 53.907352, lng: 27.555651},
                {lat: 53.904222, lng: 27.545102},
                {lat: 53.903988, lng: 27.548643},
                {lat: 53.905387, lng: 27.557389},
                {lat: 53.900090, lng: 27.550589},
                {lat: 53.901866, lng: 27.557970},
                {lat: 53.903073, lng: 27.560019},
                {lat: 53.903952, lng: 27.557337},
                {lat: 53.904020, lng: 27.545958},
                {lat: 53.903148, lng: 27.547900},
                {lat: 53.901522, lng: 27.550192}
                ],
            mapCenter: {lat: 53.904303, lng: 27.543319},
            polygonCoords: [
                { lat: 25.774, lng: -80.19 },
                { lat: 18.466, lng: -66.118 },
                { lat: 32.321, lng: -64.757 }
            ]
        };
    }

loadMapScript = () => {
    const mapId = document.getElementById(this.props.id);
    const map = new window.google.maps.Map(mapId, {
        center: this.state.mapCenter,
        zoom: 13,
        mapTypeId: 'roadmap',
    });
    const locations = [...this.state.locations];    
    const markers = locations.map((location) => {
        return new window.google.maps.Marker({
            position: location,
            map: map
        });
    });
    const polygon = new window.google.maps.Polygon({
        paths: this.state.polygonCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.35
    });
    polygon.setMap(map);
};

calculateMapCenter = () => {
  let locationsCopy = [...this.state.locations];
  let minLat = locationsCopy[0].lat;
  let maxLat = minLat;
  for (let i = 1; i < locationsCopy.length; ++i) {
    if (locationsCopy[i] > maxLat) maxLat = locationsCopy[i];
    if (locationsCopy[i] < minLat) minLat = locationsCopy[i];
  }

  let minLng = locationsCopy[0].lng;
  let maxLng = minLng;
  for (let i = 1; i < locationsCopy.length; ++i) {
    if (locationsCopy[i] > maxLng) maxLng = locationsCopy[i];
    if (locationsCopy[i] < minLng) minLng = locationsCopy[i];
  }
  let averageLat = (maxLat + minLat) / 2;
  let averageLng = (maxLng + minLng) / 2;

  let coords = {lat: averageLat, lng: averageLng};
  this.setState({mapCenter: coords});
};

componentDidMount() {
    this.calculateMapCenter();
    const script = document.createElement('script');
    const API_KEY = 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      this.loadMapScript();
    });
    document.body.appendChild(script);
};

  render() {
    return (
        <div id={this.props.id}/>
    );
  }
}

export default Map;
