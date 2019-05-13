import React from "react";
import { WeatherComponent } from "./weather";
import MapComponent from "./maps";
import { EventBoxComponent } from "./eventbox";


export class LandingComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            pos: [],
            isLoaded: false
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
                            isLoaded: true
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

        if (!this.state.isLoaded) {
            return (
                /*Add loading here */
                <div>
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