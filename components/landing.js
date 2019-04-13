import React from "react";
import { WeatherComponent } from "./weather";
import MapComponent from "./maps";
import { EventBoxComponent } from "./eventbox"


export class LandingComponent extends React.Component {
    constructor() {
        super();
        this.state = {}
    }


    render() {
        var pos1 = [];
        
        //need to change later
        pos1.push({ latitude: -34.4075307, longitude: 150.8667624 });

        return (
            <div>
                <WeatherComponent />
                <MapComponent zoom={14} markers={pos1} />
                <EventBoxComponent />
            </div>
        );
    }
}