import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header";
import {LandingComponent }  from "./components/landing";
import  SearchComponent  from "./components/search";
import { LoginComponent } from "./components/login";
import {RegisterComponent} from "./components/register";
import { MoreEventComponent } from "./components/moreEvent";
import { BrowserRouter, Switch, Route } from 'react-router-dom';



class Application extends React.Component{
    constructor() {
        super();
    }

    render() {
        return(
            <div className="container">
            <BrowserRouter> 
                 <Header  />
                <Switch>
                    <Route path="/" component={LoginComponent} exact/>
                    <Route path="/register" component={RegisterComponent} />
                    <Route path="/home" component={LandingComponent} />
                    <Route path="/search" component={SearchComponent} />
                    <Route path="/more" component={MoreEventComponent} />
                </Switch>
               
             </BrowserRouter>
            </div>
        );
    }

 
}


render(<Application/>, window.document.getElementById("app"));

