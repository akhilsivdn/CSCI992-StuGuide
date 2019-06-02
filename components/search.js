import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import MapComponent from "./maps";
import StarRatings from 'react-star-ratings';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class SearchComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: '',
            pos: [],
            isLoading: false,
            queryString: ''
        }
    }

    FilteredList(e) {

        if (e &&
            e.target.value) {

            this.setState({
                isLoading: true,
                queryString: e.target.value
            });


            const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + localStorage.getItem('latitude') + ',' + localStorage.getItem('longitude') + '&radius=25000&keyword=' + e.target.value + '&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
            fetch(url)
                .then(res => res.json())
                .then(data => this.setState({
                    data: data.results,
                    isLoading: false
                }
                ));
        }
        else {
            this.setState({
                data: [],
                pos: [],
                isLoading: false,
                queryString: ''
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

            if (this.state.queryString.length > 0 && this.state.data.length == 0) {
                return (
                    <div>
                        <div className="title_page">Search for a place to know more..</div>

                        <MapComponent markers={this.state.pos} zoom={10} />

                        <input type="text" className="form-control form-control-lg form_search" placeholder="Search for a place"
                            onChange={(e) => this.FilteredList(e)} value={this.state.queryString} />

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
                )
            }

            else {
                return (
                    <div>
                        <div className="title_page">Search for a place to know more..</div>

                        <MapComponent markers={this.state.pos} zoom={10} />

                        <input type="text" className="form-control form-control-lg form_search" placeholder="Search for a place"
                            onChange={(e) => this.FilteredList(e)} value={this.state.queryString} />

                        <div className="searchResults">
                            {
                                this.state.data.map(function (place, i) {
                                    var placeUrl = 'https://www.google.com/maps/place/?q=place_id:' + place.place_id;
                                    return (
                                        <div className="searchResultsGrid">
                                            <Paper style={{
                                                width: "75%",
                                                margin: "0 auto"
                                            }}>
                                                <div style={{
                                                    marginLeft: "30px",

                                                    display: "inline-block",

                                                }}>
                                                    <img style={{
                                                        margin: "30px",
                                                        verticalAlign: "unset"

                                                    }} src={place.icon} height='50px'></img>
                                                </div>


                                                <div className="details" style={{
                                                    marginLeft: "50px",
                                                    display: "inline-block",
                                                    marginTop: "40px",
                                                    marginBottom: "30px"
                                                }}>
                                                    <div className="search_result_name serachpageresultName" >{place.name} </div>
                                                    {place.rating && place.rating > 0 &&
                                                        <StarRatings starDimension="25px"
                                                            starSpacing="8px"
                                                            rating={place.rating}
                                                            starRatedColor="blue"
                                                            numberOfStars={5} />
                                                    }
                                                    <div className="search_result_address" >{place.vicinity} </div>
                                                </div>

                                                <div style={{
                                                    float: "right",
                                                    display: "inline-block",
                                                    marginTop: "100px",
                                                    marginRight: "100px"
                                                }}>
                                                    <Button variant="raised" >
                                                        <a target="_blank" href={placeUrl}>Get Directions</a>
                                                    </Button>
                                                </div>
                                            </Paper>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }
        }
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(SearchComponent);