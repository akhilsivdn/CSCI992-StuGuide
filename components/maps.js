import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';


export class MapComponent extends Component {

  constructor(props) {
    super(props)

    this.state = {
      latitude: '',
      longitude: ''
    }
  }

  componentDidMount(){
    this.setState({
        latitude: localStorage.getItem('latitude'),
        longitude: localStorage.getItem('longitude')
      });
  }

  render() {

    return (
      <div style={{ height: '50vh', width: '100%', clear: 'both', position: 'relative' }}>

        <Map disableDefaultUI={true}
          google={this.props.google}
          center={{
            lat: this.state.latitude,
            lng: this.state.longitude
          }}
          zoom={this.props.zoom}>

          {this.props.markers && this.props.markers.map(marker => (
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