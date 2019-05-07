import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import config from 'react-global-configuration';
import StarRatings from 'react-star-ratings';

export class TripPlannerComponent extends React.Component {
    constructor() {
        super();

        this.state = {
            data: [],
            queryLocaltion: ''
        }
    }

    SetLocation(e) {
        e.preventDefault();
        this.setState({
            queryLocaltion: e.target.value
        });
    }

    UseMyLocation(e) {
        var loc = config.get('locationName');
        this.setState({
            queryLocaltion: loc
        });
        this.FilteredList(loc);
    }

    FetchResult() {
        var loc = this.state.queryLocaltion;
        this.FilteredList(loc);
    }

    FilteredList(e) {
        this.setState({
            data: [],
            pos: []
        });

        var latitude = config.get('latitude');
        var longitude = config.get('longitude');

        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=things+to+do+in+' + e + '&language=en&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results
            }))
    }

    render() {

        var pos1 = [];

        //will change this later
        pos1.push({ latitude: config.get('latitude'), longitude: config.get('longitude') });
        this.state.pos = pos1;
        return (
            <div>
                <input type="text" className="form-control form-control-lg" placeholder="Enter location to explore"
                    onChange={(e) => this.SetLocation(e)} />
                <button className="btns" onClick={(e) => { this.FetchResult(e) }}>Fetch</button>

                <button className="btns" onClick={(e) => { this.UseMyLocation(e) }}>Use current location</button>

                <MapComponent markers={this.state.pos} zoom={10} />

                <div className="searchResults">
                    {
                        this.state.data && this.state.data.map(function (place) {

                            var openHrs = 'Opening hours not available';

                            openHrs = place.opening_hours && (place.opening_hours.open_now ? "Open" : "Closed");

                            pos1.push({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng });

                            var placeUrl = 'https://www.google.com/maps/place/?q=place_id:' + place.place_id;

                            var imgUrl = '';
                            if (place.photos && place.photos[0])
                                imgUrl = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + place.photos[0].photo_reference + '&sensor=false&maxheight=480&maxwidth=480&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

                            return (
                                <div className="searchResultsGrid">
                                    <img src={imgUrl} height='250px' width='250px'></img>
                                    <div className="details">
                                        <div className="openHrs">{openHrs}</div>
                                        <div className="search_result_name restaurantTitle">{place.name} </div>
                                        <div className="search_result_address">{place.formatted_address} </div>
                                        {/* <div className="ratingBlock">{place.rating}</div> */}
                                        <StarRatings starDimension="40px"
                                            starSpacing="8px"
                                            rating={place.rating}
                                            starRatedColor="blue"
                                            numberOfStars={5} />
                                        <div>
                                            <button><a target="_blank" href={placeUrl}>Get Directions</a></button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }, this)
                    }
                </div>
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(TripPlannerComponent);