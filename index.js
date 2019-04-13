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
import {StoresComponent} from "./components/stores";


class Application extends React.Component {
    constructor() {
        super();
    }

    render() {

        //Fix to be added - sweet spot ??
        // const backdrop = (window.location.href.includes('register')) 
        // 	? '' : (
        // 		<Header/>
        // 	); 

        return (
            <div className="container">
                <BrowserRouter>
                    <HeaderComponent />
                    <Switch>
                        <Route path="/" component={LoginComponent} exact />
                        <Route path="/register" component={RegisterComponent} />
                        <Route path="/home" component={LandingComponent} />
                        <Route path="/search" component={SearchComponent} />
                        <Route path="/transport" component={TransportComponent} />
                        <Route path="/restaurants" component={RestaurantsComponent} />
                        <Route path="/groceries" component={GroceriesComponent} />
                        <Route path="/stores" component={StoresComponent} />
                        <Route path="/more" component={MoreEventComponent} />
                    </Switch>

                </BrowserRouter>
            </div>
        );
    }


}


render(<Application />, window.document.getElementById("app"));

