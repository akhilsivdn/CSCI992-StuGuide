import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';



export class MapComponent extends Component {
  
  constructor() {
    super()

    this.state = {
      latitude: '',
      longitude: '',
    }
  }
  
  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
    const location = window.navigator && window.navigator.geolocation
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
  }


  render() {
    return (
      <div style={{ height: '50vh', width: '100%' , clear:'both'}}>
         <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'}}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          defaultZoom={14}></GoogleMapReact>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(MapComponent);
