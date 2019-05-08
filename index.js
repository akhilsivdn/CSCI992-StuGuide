import React, { Component } from "react";
import { render } from "react-dom";
import config from 'react-global-configuration';

import { HeaderComponent } from "./components/Header";
import { LandingComponent } from "./components/landing";
import SearchComponent from "./components/search";
import TransportComponent from "./components/transport";
import { LoginComponent } from "./components/login";
import { RegisterComponent } from "./components/register";
import { MoreEventComponent } from "./components/moreEvent";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { CommonComponent } from "./components/common";
import { SettingsComponent } from "./components/settings";
import { TripPlannerComponent } from "./components/tripplanner";

import { MoreEventsPageComponent } from "./components/moreEventsPage";

import { PlanoftheDayComponent } from "./components/planoftheday";
import { ForecastComponent } from "./components/forecast";
import { NewsFeedComponent } from "./components/newsfeeds";



class Application extends Component {

    componentWillMount() {
        this.getMyLocation()
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

    constructor() {
        super();
    }

    render() {

        return (
            <div className="container">
                <BrowserRouter>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" component={LoginComponent} exact />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/home" component={LandingComponent} />
                        <Route path="/search" component={SearchComponent} />
                        <Route path="/medical" component={CommonComponent} />
                        <Route path="/restaurants" component={CommonComponent} />
                        <Route path="/groceries" component={CommonComponent} />
                        <Route path="/stores" component={CommonComponent} />
                        <Route path="/lawyers" component={CommonComponent} />
                        <Route path="/parking-slots" component={CommonComponent} />
                        <Route path="/more" component={MoreEventComponent} />
                        <Route path="/transit" component={TransportComponent} />
                        <Route path="/settings" component={SettingsComponent} />

                        <Route path="/tripplanner" component={TripPlannerComponent} />
                        <Route path="/moreEvents" component= { MoreEventsPageComponent }/>

                        <Route path="/things-to-do" component={TripPlannerComponent} />
                        <Route path="/plan-for-the-day" component={PlanoftheDayComponent} />
                        <Route path="/weather-forecast" component={ForecastComponent} />
                        <Route path="/news-headlines" component={NewsFeedComponent} />

                    </Switch>

                </BrowserRouter>
            </div>
        );
    }


}


render(<Application />, window.document.getElementById("app"));