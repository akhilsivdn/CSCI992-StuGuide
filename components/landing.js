import React from "react";
import { HeaderComponent } from "./header";
import { WeatherComponent } from "./weather";
import MapComponent  from "./maps";
import {EventBoxComponent} from "./eventbox"


export class LandingComponent extends React.Component{
    constructor() {
        super();
        this.state = { }
      }


    render(){
        return(
         <div>
              <WeatherComponent/>  
              <MapComponent/> 
              <EventBoxComponent/>
         </div>
        );
    }
}