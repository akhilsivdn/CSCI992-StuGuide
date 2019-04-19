import React from "react";
import { WeatherComponent } from "./weather";
import MapComponent from "./maps";
import { EventBoxComponent } from "./eventbox"
import config from 'react-global-configuration';


export class LandingComponent extends React.Component {
    constructor() {
        super();
        this.state = {}
    }
    
    render() {
        var pos1 = [];
        
        //need to change later
        pos1.push({ latitude: config.get('latitude'), longitude: config.get('longitude') });

        return (
            <div>
                <WeatherComponent />
                <MapComponent zoom={14} markers={pos1} />
                <EventBoxComponent />
            </div>
        );
    }
}