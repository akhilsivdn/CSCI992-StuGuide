import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, Button } from "@material-ui/core";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import StarRatings from 'react-star-ratings';
import InfiniteScroll from "react-infinite-scroll-component";
import ScrollToTop from "react-scroll-up";

export class CommonComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            pos: [],
            str: '',
            title: '',
            isLoading: true,
            placeArray: [],
            nextPageToken: ''
        }
    }

    componentDidUpdate() {
        if (this.props.location.pathname != this.state.str) {
            this.FilteredList(this);
        }
    }

    componentDidMount() {
        this.FilteredList(this);
    }

    LoadMoreResults(e) {
        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0&pagetoken=' + this.state.nextPageToken;
        var arr = [];
        var resultCount = 0;
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results,
                nextPageToken: data.next_page_token
            })).then(() => {
                console.log(this.state.data);
                this.state.data.map(function (place) {
                    resultCount++;
                    place.phone = '';
                    place.website = '';

                    var lat = place.geometry.location.lat;
                    var lon = place.geometry.location.lng;

                    place.distance = this.calculateDistance(lat, lon);

                    const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place.place_id + "&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0";
                    fetch(url)
                        .then(res => res.json())
                        .then(op => {
                            place.phone = op.result.formatted_phone_number
                            place.website = op.result.website
                            arr.push(place)
                        }).then(() => {
                            if (resultCount > 0 && arr.length > 0 && resultCount == arr.length) {
                                this.Execute(arr);
                            }
                        })
                }, this)
            }
            )
    }

    DegreetoRad(value) {
        return value * Math.PI / 180;
    }

    calculateDistance(latitude, longitude) {
        var lat1 = localStorage.getItem('latitude');
        var lon1 = localStorage.getItem('longitude');

        var lat2 = latitude;
        var lon2 = longitude;
        var R = 6371;
        var dLat = this.DegreetoRad((lat2 - lat1))
        var dLon = this.DegreetoRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.DegreetoRad(lat1)) * Math.cos(this.DegreetoRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d.toFixed(1);
    }

    FilteredList(e) {
        this.state = {
            data: [],
            pos: [],
            title: '',
            placeArray: [],
        };

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
        else if (path.includes('parking')) {
            types = "parking"
            titleText = "Parking areas near me";
        }

        var latitude = localStorage.getItem('latitude');
        var longitude = localStorage.getItem('longitude');

        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&rankby=distance&types=' + types + '&sensor=true&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

        var arr = [];
        var resultCount = 0;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results,
                nextPageToken: data.next_page_token,
                placeArray: [],
                isLoading: true,
                str: this.props.location.pathname,
                title: titleText
            })).then(() => {
                this.state.data.map(function (place) {
                    resultCount++;
                    place.phone = '';
                    place.website = '';

                    var lat = place.geometry.location.lat;
                    var lon = place.geometry.location.lng;

                    place.distance = this.calculateDistance(lat, lon);

                    const url = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + place.place_id + "&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0";
                    fetch(url)
                        .then(res => res.json())
                        .then(op => {
                            place.phone = op.result.formatted_phone_number
                            place.website = op.result.website
                            arr.push(place)
                        }).then(() => {
                            if (resultCount > 0 && arr.length > 0 && resultCount == arr.length) {
                                this.Execute(arr);
                            }
                        })
                }, this)
            }
            )
    }

    Execute(arr) {
        var array = [];
        array = this.state.placeArray.concat(arr);
        //sort by distance
        array.sort(function (a, b) {
            if (a.distance < b.distance) return -1;
            if (a.distance > b.distance) return 1;
            return 0;
        });

        //Avoid redundancy
        var results = [];
        for (var i = 0; i < array.length - 1; i++) {
            if (array[i].phone != array[i + 1].phone) {
                results.push(array[i]);
            }
        }

        this.setState({
            placeArray: results,
            isLoading: false
        })
    }

    ClickPhone(phoneNumber, e) {
        e.preventDefault();
        var ph = phoneNumber.replace('(02)', '+61 2');
        ph = "tel:" + ph;
        window.open(ph);
    }

    scrollTop() {
        window.scrollTo(0, 0);
    }

    render() {

        var pos1 = [];
        if (this.state.isLoading) {
            return (
                <div className="loadingBar">
                    <Modal
                        open={this.state.isLoading}
                        style={{
                            transitionDuration: '800ms',
                            transitionDelay: '800ms'
                        }}>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                top: '45%',
                                left: '47%',
                                color: '#1f41fa',
                            }}
                            thickness={4}
                            size={70}
                        />
                    </Modal>
                </div>
            )
        }
        else {
            pos1.push({ latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude') });
            this.state.pos = pos1;
            if (this.state.placeArray.length > 0) {
                return (
                    <div>
                        <div className="title_page">{this.state.title}</div>

                        <MapComponent markers={this.state.pos} zoom={10} />

                        <ScrollToTop showUnder={500} duration={1000}>
                            <img src="https://cdn2.iconfinder.com/data/icons/essential-web-1-1/50/arrow-circle-up-angle-top-256.png"
                                style={{ height: "50px", width: "50px" }} />
                        </ScrollToTop>

                        <InfiniteScroll
                            dataLength={this.state.placeArray.length}
                            next={(e) => this.LoadMoreResults(e)}
                            hasMore={this.state.nextPageToken}
                            loader={<h4 style={{
                                margin: '10px',
                                fontSize: '18px',
                                fontStyle: 'italic',
                                fontWeight: '600'
                            }}>Loading...</h4>}>
                            {
                                this.state.placeArray && this.state.placeArray.map(function (place) {

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
                                            <Card
                                                style={{
                                                    display: 'flex',
                                                    // borderStyle: 'solid',
                                                    height: '250px',
                                                    width: '96%',
                                                    marginInlineStart: '10px',
                                                    padding: 'inherit',
                                                    borderRadius: '10px',
                                                }} >
                                                <img src={imgUrl} height='250px' width='300px'
                                                    onError={(e) => {
                                                        e.target.onerror = null; e.target.src = "./nodata.png"; e.target.className = "dd"
                                                    }}></img>
                                                <div className="details detailsCommon">
                                                    <div className="openHrs">{openHrs}</div>
                                                    <div className="search_result_name restaurantTitle">{place.name} </div>
                                                    <div className="search_result_address">{place.vicinity} </div>
                                                    {place.rating && place.rating > 0 &&
                                                        <StarRatings starDimension="20px"
                                                            starSpacing="2px"
                                                            rating={place.rating}
                                                            starRatedColor="blue"
                                                            numberOfStars={5} />
                                                    }

                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        <div className="price">{price}</div>
                                                        <div style={{
                                                            height: "8px",
                                                            width: "8px",
                                                            background: "#212529",
                                                            borderRadius: "50%",
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            opacity: "0.8"
                                                        }}></div>
                                                        <div className="price">{place.distance} km</div>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center" }}>
                                                        {place.phone &&
                                                            <div className="price" onClick={(e) => this.ClickPhone(place.phone, e)}>
                                                                <a target="_blank" href={place.phone}>Call</a>&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </div>
                                                        }
                                                        {place.website &&
                                                            <div className="price">
                                                                <a target="_blank" href={place.website}>Website</a>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div>
                                                        <Button variant="contained" color="primary"><a target="_blank" href={placeUrl} style={{ color: 'white' }}>Get Directions</a></Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </div>
                                    );
                                }, this)
                            }
                        </InfiniteScroll>
                    </div >
                )
            }
            else {
                return (
                    <div>
                        <div className="title_page">{this.state.title}</div>
                        <MapComponent markers={this.state.pos} zoom={10} />
                        <div className="searchResults" style={{ textAlign: "center" }}>
                            <span style={{
                                display: "block",
                                fontSize: "24px",
                                fontWeight: "500",
                                marginBottom: "20px"
                            }}>Oops ! No results found</span>
                            <img src="./noresults.png" width="250px" height="250px" />
                        </div>
                    </div>
                );

            }
        }
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(CommonComponent);