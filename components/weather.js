import React from "react";
import config from 'react-global-configuration';


export class WeatherComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            temp: '',
            humidity: '',
            image: '',
            name: '',
            region: '',
            data: null,
            wind: '',
            condtnText: ''
        }

    }

    componentDidMount() {
        this.GetIt();
    }

    GetIt() {
        var location = config.get('locationName');
        fetch('https://api.apixu.com/v1/current.json?key=e7ab3fccbda843c8b4485021192303&q=' + location)
            .then(res => res.json())
            .then(data => this.setState({
                data,
                image: data.current.condition.icon,
                temp: data.current.temp_c,
                name: data.location.name,
                region: data.location.region,
                wind: data.current.wind_kph,
                condtnText: data.current.condition.text
            }
            ));
    }

    render() {
        return (
            <div className="weatherDiv">

                <div>
                    <div>Current temperature: {this.state.temp}&#8451;</div>
                    <div>Wind speed: {this.state.wind}</div>
                    <div>{this.state.name}</div>
                    <div>{this.state.condtnText}</div>
                </div>
                <div>
                    <img src={this.state.image} width={'120px'} height={'120px'}></img>
                </div>

            </div>
        );
    }
}