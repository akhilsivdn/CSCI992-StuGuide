import React from "react";

import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import config from 'react-global-configuration';

export class SearchComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: '',
            pos: []
        }
    }

    FilteredList(e) {
        if (e &&
            e.target.value) {
            //allow-cross-origin header problem. so this fix. will change if we get some time later.
            const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + config.get('latitude') + ',' + config.get('longitude') + '&radius=25000&keyword=' + e.target.value + '&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
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

    DisplayPrice() {
        return '$';
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
            pos1.push({ latitude: config.get('latitude'), longitude: config.get('longitude') });
        }

        this.state.pos = pos1;

        return (
            <div>
                <div className="title_common_menu">Search for a place to know more..</div>

                <MapComponent markers={this.state.pos} zoom={10} />

                <input type="text" className="form-control form-control-lg form_search" placeholder="Search for a place"
                    onChange={(e) => this.FilteredList(e)} />

                <div className="searchResults">
                    {
                        this.state.data.map(function (place, i) {
                            var price = '';
                            if (place.price_level) {
                                switch (place.price_level) {
                                    case 1:
                                        price = '$';
                                        break;
                                    case 2:
                                        price = '$$';
                                        break;
                                    case 3:
                                        price = '$$$';
                                        break;
                                    case 4:
                                        price = '$$$$';
                                        break;
                                    case 5:
                                        price = '$$$$$';
                                        break;
                                }
                            }
                            var fn = (place.opening_hours && place.opening_hours.open_now) ? "Open" : (place.opening_hours ? "Closed" : "");
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
})(SearchComponent);