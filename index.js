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

class Application extends Component {

    componentWillMount() {
        this.getMyLocation()
    }

    getMyLocation() {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                config.set({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => {
                console.log(error.message);
                //set default location to university of wollongong
                config.set({
                    latitude: '-34.4054',
                    longitude: '150.8784'
                });
            })
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
                        <Route path="/more" component={MoreEventComponent} />
                        <Route path="/transit" component={TransportComponent} />
                        <Route path="/settings" component={SettingsComponent} />
                        <Route path="/tripplanner" component={TripPlannerComponent} />
                    </Switch>

                </BrowserRouter>
            </div>
        );
    }


}


render(<Application />, window.document.getElementById("app"));