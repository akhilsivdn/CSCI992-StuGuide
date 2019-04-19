import React from "react";
import { render } from "react-dom";

import { HeaderComponent } from "./components/Header";
import { LandingComponent } from "./components/landing";
import SearchComponent from "./components/search";
import TransportComponent from "./components/transport";
import { LoginComponent } from "./components/login";
import { RegisterComponent } from "./components/register";
import { MoreEventComponent } from "./components/moreEvent";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RestaurantsComponent } from "./components/restaurants";
import { GroceriesComponent } from "./components/groceries";
import { StoresComponent } from "./components/stores";
import { CommonComponent } from "./components/common";
import { SettingsComponent } from "./components/settings";
import { TripPlannerComponent } from "./components/tripplanner";

class Application extends React.Component {
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

