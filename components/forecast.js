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

        fetch('http://api.apixu.com/v1/forecast.json?key=e7ab3fccbda843c8b4485021192303&days=6&q=' + location)
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
            <div className="forecastpage">
                <div>
                    <div>{location}</div>
                    <hr />
                    <div className="forecast_current">
                        <div className="current_weather_text">
                            <span style={{
                                display: 'block'
                            }}>{this.state.current && this.state.current.condition.text}</span>
                            <span>{this.state.current && this.state.current.temp_c}&#8451;</span>
                        </div>
                        <div className="current_weather_image">
                            <img src={this.state.current && this.state.current.condition.icon} width={'120px'} height={'120px'}></img>
                        </div>
                    </div>
                    <hr />
                    <div className="forecastDays">
                        {
                            this.state.forecastDays.map(function (forecastDay, i) {
                                if (i == 0) {
                                    return ('');
                                }

                                if (this.state.day == 7) {
                                    this.state.day = 0;
                                }
                                let dayString = this.DisplayDayoftheWeek(this.state.day);
                                this.state.day++;

                                return (
                                    <div className="forecast">
                                        <div>{dayString}</div>
                                        <div className="current_weather_image">
                                            <img src={forecastDay.day.condition.icon} width={'120px'} height={'120px'}></img>
                                        </div>
                                        <div>
                                            <div className="current_weather_text">
                                                <div className="conditionText">{forecastDay.day.maxtemp_c}&#8451;</div>
                                                <div className="conditionText">{forecastDay.day.mintemp_c}&#8451;</div>
                                            </div>


                                        </div>
                                    </div>
                                )
                            }, this)
                        }
                    </div>
                </div>
            </div>
        );
    }
}