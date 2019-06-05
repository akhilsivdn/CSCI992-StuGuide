import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import { Card, Grid, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";
import StarRatings from 'react-star-ratings';
import InfiniteScroll from "react-infinite-scroll-component";

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
        this.setState({
            placeArray: array,
            isLoading: false
        })
    }

    ClickPhone(phoneNumber, e) {
        e.preventDefault();
        var ph = phoneNumber.replace('(02)', '+61 2');
        ph = "tel:" + ph;
        window.open(ph);
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

                        <InfiniteScroll
                            dataLength={20}
                            next={(e) => this.LoadMoreResults(e)}
                            hasMore={true}
                            loader={<h4 style={{
                                'margin': '10px',
                                'font-size': '18px',
                                'font-style': 'italic',
                                'font-weight': '600'
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
                                                    width: '98%',
                                                    marginInlineStart: '10px',
                                                    padding: 'inherit',
                                                    borderRadius: '10px',
                                                }} >

                                                {/* <img src={imgUrl} height='250px !important' width='300px !important'
                                                    onError={(e) => {
                                                        e.target.onerror = null; e.target.src = "./nodata.png"; e.target.className = "dd"
                                                    }}></img> */}
                                                <CardMedia
                                                    component='img'
                                                    src={imgUrl}
                                                    style={{
                                                        width: '300px',
                                                        // borderRight: 'solid',
                                                        // borderRadius: '9px',
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = "./nodata.png";
                                                        e.target.className = "dd"
                                                    }}
                                                />
                                                <CardContent style={{
                                                    marginLeft: '10px',
                                                    width: '800px',
                                                    height: 'inherit'
                                                }}>
                                                    <Grid container>
                                                        <Grid item
                                                        style={{width:'400px'}}>
                                                            <Grid container>
                                                                <Typography
                                                                    style={{
                                                                        marginBottom: '10px',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                    variant="h5" component="strong">
                                                                    {place.name}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container>
                                                                <Typography variant="subtitle1">
                                                                    Currently : {openHrs}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container>
                                                                <Typography variant="subtitle1">
                                                                    Ratings : {place.rating && place.rating > 0 &&
                                                                        <StarRatings starDimension="18px"
                                                                            starSpacing="2px"
                                                                            rating={place.rating}
                                                                            starRatedColor="red"
                                                                            numberOfStars={5} />
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container>
                                                                <Typography variant="subtitle1">
                                                                    Cost : {price && price != '' && price
                                                                        // <div className="price">{price}</div>
                                                                    }
                                                                </Typography>
                                                            </Grid>
                                                            <Grid container>
                                                                {/* <Button size="small"
                                                                style={{marginTop:'10px'}}> */}
                                                                {place.phone &&
                                                                    <div className="" onClick={(e) => this.ClickPhone(place.phone, e)}>
                                                                        <a target="_blank" href={place.phone}>Call</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                        </div>
                                                                }
                                                                {/* </Button> */}
                                                                {/* <Button size="small"
                                                                    style={{marginTop:'10px'}}> */}
                                                                {place.website &&
                                                                    <div className="">
                                                                        <a target="_blank" href={place.website}>Website</a>
                                                                    </div>
                                                                }
                                                                {/* </Button> */}
                                                            </Grid>
                                                            <Grid container>
                                                                <Button
                                                                    style={{
                                                                        marginTop: '20px',
                                                                        marginBottom:'500px'
                                                                    }}>
                                                                    <a target="_blank" href={placeUrl}>Get Directions</a>
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container>
                                                                <Typography 
                                                                 style={{
                                                                    fontWeight: 'bold'
                                                                }}
                                                                variant="subtitle1">
                                                                    Address : {place.vicinity}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
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