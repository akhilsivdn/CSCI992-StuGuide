import React from "react";
import { WeatherComponent } from "./weather";
import MapComponent from "./maps";
import { EventBoxComponent } from "./eventbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class LandingComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            pos: [],
            isLoading: true
        }
    }

    componentDidMount() {
        this.getMyLocation();
    }

    getMyLocation() {
        var latitude = '';
        var longitude = '';
        var placeName = '';

        const location = window.navigator && window.navigator.geolocation;
 
        if (location) {
            location.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude
                localStorage.setItem("latitude", latitude);
                localStorage.setItem("longitude", longitude);

                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        placeName = data.results[0].address_components[2].long_name;
                        localStorage.setItem("locationName", placeName);
                        this.setState({
                            isLoading: false
                        })
                    });
            }, (error) => {
                console.log(error.message);
                //set default location to university of wollongong
                localStorage.setItem("latitude", "-34.4054");
                localStorage.setItem("longitude", '150.8784');
                localStorage.setItem("locationName", 'Wollongong');
            }
            )
        }
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
            pos1.push({
                latitude: localStorage.getItem("latitude"),
                longitude: localStorage.getItem("longitude")
            });
        }

        catch (error) {
            console.log(error);
        }
        return (
            <div>
                <WeatherComponent />
                <MapComponent zoom={14} markers={pos1} />
                <EventBoxComponent />
            </div>
        );
    }
}