import React from "react";
import config from 'react-global-configuration';


export class ForecastComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            data: null,
        }
    }


    componentDidMount() {
        this.GetIt();
    }
    
    GetIt() {
        var location = config.get('locationName');

        fetch('http://api.apixu.com/v1/forecast.json?key=e7ab3fccbda843c8b4485021192303&days=7&q=' + location)
            .then(res => res.json())
            .then(data => this.setState({
                data
            }
            ));
    }


    render() {
        return (
            <div>
                TODO: WEATHER FORECAST !
            </div>
        );
    }
}