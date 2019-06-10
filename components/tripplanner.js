import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import StarRatings from 'react-star-ratings';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

import { Card, Button } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import LocationIcon from '@material-ui/icons/GpsFixed';  //LocationOn

export class TripPlannerComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            queryLocaltion: '',
            noResultsAvailable: false
        }
    }

    SetLocation(e) {
        e.preventDefault();
        this.setState({
            queryLocaltion: e.target.value,
            noResultsAvailable: false,
            data: []
        });
    }

    UseMyLocation(e) {
        var loc = localStorage.getItem('locationName');
        this.setState({
            queryLocaltion: loc,
            noResultsAvailable: false,
            data: []
        });
        this.FilteredList(loc);
    }


    OnKeyUp(e) {
        if (e.keyCode == 13 && this.state.queryLocaltion) {
            e.preventDefault();
            var loc = this.state.queryLocaltion;
            this.FilteredList(loc);
        }
    }

    FilteredList(e) {
        this.setState({
            data: [],
            pos: [],
            isLoading: true,
            noResultsAvailable: false
        });

        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=things+to+do+in+' + e + '&language=en&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.results,
                isLoading: false,
                noResultsAvailable: data.status == "ZERO_RESULTS"
            }))
    }

    render() {


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

        var pos1 = [];
        try {
            pos1.push({ latitude: localStorage.getItem('latitude'), longitude: localStorage.getItem('longitude') });
        }

        catch (error) {
            console.log(error);
        }

        this.state.pos = pos1;

        var template = '';

        if (this.state.data.length > 0) {
            template = (
                <div>

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
                                            <img src={imgUrl} height='250px' width='250px'></img>
                                            <div className="details">
                                                <div style={{ marginTop: '5px' }}
                                                    className="openHrs">{openHrs}</div>
                                                <div className="search_result_name restaurantTitle">{place.name} </div>
                                                <div className="search_result_address">{place.formatted_address} </div>
                                                <StarRatings starDimension="25px"
                                                    starSpacing="8px"
                                                    rating={place.rating}
                                                    starRatedColor="blue"
                                                    numberOfStars={5} />

                                                <div>
                                                    <Button
                                                        style={{ marginTop: '60px' }}
                                                        variant="contained" color="primary">
                                                        <a target="_blank" href={placeUrl} style={{ color: 'white' }}>Get Directions</a>
                                                    </Button>
                                                </div>
                                                {/* <div>
                                                <button><a target="_blank" href={placeUrl}>Get Directions</a></button>
                                            </div> */}
                                            </div>
                                        </Card>

                                    </div>
                                );
                            }, this)
                        }
                    </div>
                </div>
            );

        }
        if (this.state.noResultsAvailable) {
            template = (
                <div className="searchResults" style={{ textAlign: "center" }}>
                    <span style={{
                        display: "block",
                        fontSize: "24px",
                        fontWeight: "500",
                        marginBottom: "20px"
                    }}>Oops ! No results found</span>
                    <img src="./noresults.png" width="250px" height="250px" />
                </div>
            );
        }

        return (
            <div>
                <div className="title_page">Things To Do..</div>
                <Paper style={{
                    padding: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px'
                }}>

                    <InputBase
                        style={{
                            marginLeft: 8,
                            flex: 1
                        }}
                        value={this.state.queryLocaltion}
                        onChange={(e) => this.SetLocation(e)}
                        placeholder="Enter location to explore"
                    />

                    <Divider style={{
                        width: 1,
                        height: 28,
                        margin: 4,
                    }} />

                    <Tooltip
                        title="Current Location"
                    >
                        <IconButton color="primary"
                            style={{
                                padding: 10,
                            }}
                            onClick={(e) => { this.UseMyLocation(e) }}
                        >
                            <LocationIcon />
                        </IconButton>
                    </Tooltip>

                </Paper>


                {/* <input type="text" onKeyUp={(e) => this.OnKeyUp(e)} className="form-control form-control-lg" placeholder="Enter location to explore"
                    value={this.state.queryLocaltion} onChange={(e) => this.SetLocation(e)} /> */}

                {/* <button className="btns" onClick={(e) => { this.UseMyLocation(e) }}>Use current location</button> */}

                <MapComponent markers={this.state.pos} zoom={10} />

                {template}
            </div >
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(TripPlannerComponent);