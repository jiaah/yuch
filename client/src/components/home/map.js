import React, { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    const mapDiv = document.getElementById('map');
    const mapOptions = {
      center: new naver.maps.LatLng(35.87543, 129.2203883),
      zoom: 12,
    };

    const map = new naver.maps.Map(mapDiv, mapOptions);
    // eslint-disable-next-line no-unused-vars
    const marker = new naver.maps.Marker({
      map,
      position: new naver.maps.LatLng(35.87543, 129.2203883),
    });
  };

  render() {
    return <div id="map" />;
  }
}

export default Map;
