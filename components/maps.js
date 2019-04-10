import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      latitude: '',
      longitude: '',
    }
  }

  componentWillMount() {
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

      console.log(this.state.latitude);
      console.log(this.state.longitude);
    }
  }


  render() {

    return (
      <div style={{ height: '50vh', width: '100%', clear: 'both', position: 'relative' }}>

        <Map
          google={this.props.google}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          zoom={this.props.zoom}>

          {this.props.markers.map(marker => (
            <Marker key={marker.id} id={marker.id}
              position={{ lat: marker.latitude, lng: marker.longitude }}
            />
          ))}

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(MapComponent);
