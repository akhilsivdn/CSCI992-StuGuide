import React from "react";
import config from 'react-global-configuration';


export class ForecastComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            forecastDays: [],
            day: 0,
            current: null
        }
    }


    componentDidMount() {
        this.GetIt();
    }

    DisplayDayoftheWeek(day) {
        let dayString = '';
        switch (day) {
            case 0:
                dayString = "SUN";
                break;
            case 1:
                dayString = "MON";
                break;
            case 2:
                dayString = "TUE";
                break;
            case 3:
                dayString = "WED";
                break;
            case 4:
                dayString = "THU";
                break;
            case 5:
                dayString = "FRI";
                break;
            case 6:
                dayString = "SAT";
                break;
        }
        return dayString;
    }

    GetIt() {
        var location = config.get('locationName');
        let newDate = new Date()
        this.setState({
            day: newDate.getDay() + 1
        });

        this.DisplayDayoftheWeek(1);

        fetch('http://api.apixu.com/v1/forecast.json?key=e7ab3fccbda843c8b4485021192303&days=5&q=' + location)
            .then(res => res.json())
            .then(data => this.setState({
                current: data.current,
                forecastDays: data.forecast.forecastday
            }
            ));
    }


    render() {
        var location = config.get('locationName');

        return (
            <div className="forecast">
                <div>{location}</div>
                <div className="forecast_current">
                    <div className="current_weather_text">
                        <span className="conditionText">{this.state.current && this.state.current.condition.text}</span>
                        <span>{this.state.current && this.state.current.temp_c}&#8451;</span>
                    </div>
                    <div className="current_weather_image">
                        <img src={this.state.current && this.state.current.condition.icon} width={'120px'} height={'120px'}></img>
                    </div>

                </div>
                <hr />
                {
                    this.state.forecastDays.map(function (forecastDay, i) {
                        let dayString = this.DisplayDayoftheWeek(this.state.day);
                        this.state.day++;

                        return (
                            <div>

                            </div>
                        )
                    }, this)
                }
            </div>
        );
    }
}