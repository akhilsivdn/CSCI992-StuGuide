import React, { Component } from "react";
import { render } from "react-dom";
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
import { ForgotPasswordComponent } from "./components/frgtpassword";



class Application extends Component {
    constructor() {
        super();
    }

    render() {

        return (
            <div className="container">
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LoginComponent} exact />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/forgot-password" component={ForgotPasswordComponent} />
                        <switch>
                            <HeaderComponent />
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
                            <Route path="/moreEvents" component={MoreEventsPageComponent} />

                            <Route path="/things-to-do" component={TripPlannerComponent} />
                            <Route path="/plan-for-the-day" component={PlanoftheDayComponent} />
                            <Route path="/weather-forecast" component={ForecastComponent} />
                            <Route path="/news-headlines" component={NewsFeedComponent} />
                        </switch>

                    </Switch>

                </BrowserRouter>
            </div>
        );
    }


}


render(<Application />, window.document.getElementById("app"));