import React from "react";

import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";

//Not completed.
export class TransportComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: '',
            pos: []
        }
    }

    componentDidMount() {

    }

    FilteredList(e) {
        if (e &&
            e.target.value) {
            //allow-cross-origin header problem. so this fix. will change if we get some time later.
            const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-34.4075307%20150.8667624%20&radius=2500&type=bus_station&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
            fetch(url)
                .then(res => res.json())
                .then(data => this.setState({
                    data: data.results
                }
                ));
        }

        else {
            this.setState({
                data: [],
                pos: []
            });
        }
    }

    render() {

        var pos1 = [];

        if (this && this.state.data.length > 0) {
            this.state.data.map(function (place, i) {
                pos1.push({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng })
            })
        }
        else {
            //will change this later
            pos1.push({ latitude: -34.4075307, longitude: 150.8667624 })
        }

        this.state.pos = pos1;

        return (
            <div>

                <MapComponent markers={this.state.pos} zoom={10} />

                <input type="text" className="form-control form-control-lg" placeholder="Search"
                    onChange={(e) => this.FilteredList(e)} />

                <div className="searchResults">
                    {
                        this.state.data.map(function (place, i) {
                  
                            var placeUrl = 'https://www.google.com/maps/place/?q=place_id:' + place.place_id;
                            return (
                                <div className="searchResultsGrid">
                                    <img src={place.icon} height='50px'></img>
                                    <div className="details">
                                        <div className="search_result_name">{place.name} </div>
                                        <div className="search_result_address">{place.vicinity} </div>
                                        <button>
                                            <a target="_blank" href={placeUrl}>Get Directions</a>
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(TransportComponent);