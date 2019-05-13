import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import StarRatings from 'react-star-ratings';

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
            const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + localStorage.getItem('latitude') + ',' + localStorage.getItem('longitude') + '&radius=25000&keyword=' + e.target.value + '&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
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
            try {
                pos1.push({ latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude') });
            }
            catch (error) {
                console.log(error);
            }
        }

        this.state.pos = pos1;

        return (
            <div>
                <div className="title_page">Search for a place to know more..</div>

                <MapComponent markers={this.state.pos} zoom={10} />

                <input type="text" className="form-control form-control-lg form_search" placeholder="Search for a place"
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
                                        {place.rating && place.rating > 0 &&
                                            <StarRatings starDimension="25px"
                                                starSpacing="8px"
                                                rating={place.rating}
                                                starRatedColor="blue"
                                                numberOfStars={5} />
                                        }
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