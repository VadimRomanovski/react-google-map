import React from 'react';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            locations: null,
            polygonCoords: null
        };
    }

loadMapScript = () => {
    const mapId = document.getElementById(this.props.id);
    const map = new window.google.maps.Map(mapId, {
        center: {lat: 53.904303, lng: 27.543319},
        zoom: 5,
        mapTypeId: 'roadmap',
    });
    const locations = [...this.state.locations];  
    const mapLatLngBounds = new window.google.maps.LatLngBounds(); 
    const markerIco = {
        url: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678085-house-512.png",
        scaledSize: new window.google.maps.Size(40, 40)
    };
    const markers = locations.map((location) => {
        mapLatLngBounds.extend(location);
        return new window.google.maps.Marker({
            position: location,
            map: map,
            icon: markerIco
        });
    });
    map.setCenter(mapLatLngBounds.getCenter());
    map.fitBounds(mapLatLngBounds);
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

getCoords = async () => {
    fetch(`http://localhost:5000/`)
    .then(response => response.json())
    .then(coords => {
        this.setState(
            {
                locations: coords.locations, 
                polygonCoords: coords.polygonCoords, 
                isFetching: false 
            }
        )
    })
    .catch(e => {
        console.log(e);
    });
};

componentDidMount() {
    this.getCoords()
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
