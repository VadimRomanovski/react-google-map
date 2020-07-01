import React, { useEffect } from 'react';
import './App.css';

function App() {

  const loadMapScript = () => {
    const mapId = document.getElementById('map');
    const map = new window.google.maps.Map(mapId, {
      center: { lat: 53.907377, lng: 27.553035 },
      zoom: 12,
      mapTypeId: 'roadmap',
    });
    const marker = new window.google.maps.Marker({
      position: { lat: 53.907377, lng: 27.553035 },
      map: map
    });
  }

  useEffect(() => {
    const script = document.createElement('script');
    const API_KEY = 'AIzaSyDbAz1XXxDoKSU2nZXec89rcHPxgkvVoiw';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;
    script.addEventListener('load', () => {
      loadMapScript();
    });

    document.body.appendChild(script);

  }); 

  return (
    <div className="App">
      <div id="map">

      </div>
    </div>
  );
}

export default App;
