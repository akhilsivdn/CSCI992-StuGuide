import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';


export class TripPlannerComponent extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }


    render() {
        return (
            <div>

            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(TripPlannerComponent);