import React from "react";

import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";


export class CommonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            curr: '',
            pos: [],
            str: '',
            title: ''
        }
    }

    componentDidUpdate() {

        if (this.props.location.pathname != this.state.str) {
            this.FilteredList(this);
        }
    }

    componentDidMount(prevProps, prevState) {
        this.FilteredList(this);
    }

    FilteredList(e) {

        //allow-cross-origin header problem. so this fix. will change if we get some time later.

        this.state = {
            data: [],
            pos: [],
            title: ''
        }


        var types = "";
        var titleText = '';
        var path = this.props.location.pathname;
        if (path.includes('groceries')) {
            types = "grocery_or_supermarket|shopping_mall";
            titleText = "Grocery stores near me";
        }
        else if (path.includes('restaurants')) {
            types = "cafe|restaurant";
            titleText = "Restaurants and Cafes near me";
        }
        else if (path.includes('stores')) {
            types = "convenience_store";
            titleText = "Convenient Stores near me";
        }

        else if (path.includes('medical')) {
            types = "hospital|pharmacy";
            titleText = "Hospitals and pharamcies near me";
        }

        else if (path.includes('lawyers')) {
            types = "lawyer"
            titleText = "Lawyers near me";
        }



        //Not adding else - we may need to add more here..
        const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-34.4075307%20150.8667624&radius=5000&rankBy=distance&types=" + types + "&sensor=true&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0";

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results,
                str: this.props.location.pathname,
                title: titleText
            }
            )
            );


    }

    DisplayPrice() {
        return '$';
    }

    render() {

        var pos1 = [];

        //will change this later
        pos1.push({ latitude: -34.4075307, longitude: 150.8667624 });

        this.state.pos = pos1;

        return (
            <div>
                <div className="title_common_menu">{this.state.title}</div>

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

                            pos1.push({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng });

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
})(CommonComponent);