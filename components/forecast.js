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
                dayString = "Sun";
                break;
            case 1:
                dayString = "Mon";
                break;
            case 2:
                dayString = "Tue";
                break;
            case 3:
                dayString = "Wed";
                break;
            case 4:
                dayString = "Thu";
                break;
            case 5:
                dayString = "Fri";
                break;
            case 6:
                dayString = "Sat";
                break;
        }
        return dayString;
    }

    GetIt() {
        try {
            var location = localStorage.getItem('locationName');
        }
        catch (error) {
            console.log(error);
        }

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
        try {
            var location = localStorage.getItem('locationName');
        }

        catch (error) {
            console.log(error);
        }


        return (
            <div className="forecastpage">
                <div>
                    <div>
                        <br />

                        <font size={'5'}><b>{location}</b></font>
                    </div>
                    <hr />

                    <div className="forecast_current">
                        <div className="current_weather_text">
                            <span style={{
                                display: 'block'
                            }}>        <font size={'5'}>{this.state.current && this.state.current.condition.text}</font></span>
                            <span>        <font size={'6'}><b>{this.state.current && this.state.current.temp_c}℃</b></font></span>
                        </div>
                        <div className="current_weather_image">

                            <img src={this.state.current && this.state.current.condition.icon} width={'120px'} height={'120px'}></img>
                        </div>
                    </div>

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
                                        <div><font size={'5'}>{dayString}</font></div>
                                        <div className="current_weather_image">
                                            <img src={forecastDay.day.condition.icon} width={'100px'} height={'100px'}></img>
                                        </div>
                                        <div>
                                            <div className="current_weather_text">
                                                <div className="conditionText"><b>{forecastDay.day.maxtemp_c}℃</b></div>
                                                <div className="conditionText">{forecastDay.day.mintemp_c}℃</div>
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