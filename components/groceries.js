import React from "react";

import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";

export class GroceriesComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: '',
            pos: []
        }
    }

    componentDidMount() {
        this.FilteredList();
    }

    FilteredList() {
        //allow-cross-origin header problem. so this fix. will change if we get some time later.

        var types = "grocery_or_supermarket|shopping_mall";

        const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-34.4075307%20150.8667624&radius=5000&rankBy=distance&types=" + types + "&sensor=true&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0";

        //  const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-34.4075307%20150.8667624%20&type=restaurants&radius=10000&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results
            }
            ));
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
            pos1.push({ latitude: -34.4075307, longitude: 150.8667624 })
        }

        this.state.pos = pos1;

        return (
            <div>

                <MapComponent markers={this.state.pos} zoom={10} />

                <div className="searchResults">
                    {
                        this.state.data.map(function (place, i) {
                            var price = 'Price not available';
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
                            var openHrs = 'Opening hours not available';
                            openHrs = place.opening_hours && (place.opening_hours.open_now ? "Open" : "Closed");


                            // var cuisineList = '';
                            // //cuisineList = place.types.toString();

                            // if (place.types) {
                            //     if (place.types.includes('cafe') && place.types.includes('restaurant')) {
                            //         cuisineList = "Cafe . Restaurant"
                            //     }
                            //     //cuisineList = place.types.toString();
                            // }

                            var placeUrl = 'https://www.google.com/maps/place/?q=place_id:' + place.place_id;

                            var imgUrl = '';
                            if (place.photos && place.photos[0])
                                imgUrl = 'https://maps.googleapis.com/maps/api/place/photo?photoreference=' + place.photos[0].photo_reference + '&sensor=false&maxheight=480&maxwidth=480&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

                            return (
                                <div className="searchResultsGrid">
                                    <img src={imgUrl} height='300px' width='300px'></img>
                                    <div className="details">
                                        <div className="openHrs">{openHrs}</div>
                                        <div className="search_result_name restaurantTitle">{place.name} </div>
                                        <div className="search_result_address">{place.vicinity} </div>
                                        <div className="ratingBlock">{place.rating}</div>
                                        <div className="price">{price}</div>
                                        {/* <div className="price">{cuisineList}</div> */}
                                       
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
})(GroceriesComponent);