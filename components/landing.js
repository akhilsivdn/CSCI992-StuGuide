import React from "react";
import { WeatherComponent } from "./weather";
import MapComponent from "./maps";
import { EventBoxComponent } from "./eventbox"
import config from 'react-global-configuration';

export class LandingComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            pos: []
        }
    }

    componentWillMount() {
        this.getMyLocation();
    }

    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation

        var latitude = '';
        var longitude = '';
        var placeName = '';

        if (location) {
            location.getCurrentPosition((position) => {
                latitude = position.coords.latitude
                longitude = position.coords.longitude

                const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';

                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        placeName = data.results[0].address_components[2].long_name

                        config.set({
                            latitude: latitude,
                            longitude: longitude,
                            locationName: placeName
                        });
                    });
            }, (error) => {
                console.log(error.message);
                //set default location to university of wollongong
                config.set({
                    latitude: '-34.4054',
                    longitude: '150.8784',
                    locationName: 'Wollongong'
                });
            },
            )
        }
    }

    render() {
        var pos1 = [];

        try {
            pos1.push({ latitude: config.get('latitude'), longitude: config.get('longitude') });
        }

        catch (error) {
            config.set({
                latitude: '-34.4054',
                longitude: '150.8784',
                locationName: 'Wollongong'
            });
            pos1.push({ latitude: config.get('latitude'), longitude: config.get('longitude') });
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