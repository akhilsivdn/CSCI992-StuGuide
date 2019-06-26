import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class ForecastComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            forecastDays: [],
            day: 0,
            current: null,
            isLoading: true
        }
    }


    componentDidMount() {
        this.GetIt();
    }

    DisplayDayoftheWeek(day) {
        let dayString = '';
        switch (day) {
            case 0:
                dayString = "Sunday";
                break;
            case 1:
                dayString = "Monday";
                break;
            case 2:
                dayString = "Tuesday";
                break;
            case 3:
                dayString = "Wednesday";
                break;
            case 4:
                dayString = "Thursday";
                break;
            case 5:
                dayString = "Friday";
                break;
            case 6:
                dayString = "Saturday";
                break;
        }
        return dayString;
    }

    GetIt() {
        var location = localStorage.getItem('locationName');

        let newDate = new Date()
        this.setState({
            day: newDate.getDay() + 1
        });

        this.DisplayDayoftheWeek(1);

        fetch('http://api.apixu.com/v1/forecast.json?key=e7ab3fccbda843c8b4485021192303&days=7&q=' + location)
            .then(res => res.json())
            .then(data => this.setState({
                current: data.current,
                forecastDays: data.forecast.forecastday,
                isLoading: false
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

        if (this.state.isLoading) {
            return (
                <div className="loadingBar">
                    <Modal
                        open={this.state.isLoading}
                        style={{
                            transitionDuration: '800ms',
                            transitionDelay: '800ms'
                        }}>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                top: '45%',
                                left: '47%',
                                color: '#1f41fa',
                            }}
                            thickness={4}
                            size={70}
                        />
                    </Modal>
                </div>
            )
        }

        return (
            <div>
                <div className="title_page">Weather forecast for the next week</div>
                <div className="forecastpage">
                    <div>
                        <div align="center">
                            <br />
                            <img src={'https://cdn3.iconfinder.com/data/icons/unicons-vector-icons-pack/32/location-512.png'} width={'18px'} height={'18px'}></img>
                            <br />
                            <font size={'5'}><b>{location}</b></font>
                        </div>
                        <hr />

                        <div align="center">
                            <span><font size={'10'}><b>{this.state.current && this.state.current.temp_c}&#176;</b></font></span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>
                                <img src={this.state.current && this.state.current.condition.icon} style={{
                                    width: "75px",
                                    height: "75px",
                                    verticalAlign: "top"
                                }}></img>
                            </span>
                        </div>

                        <div align="center" style={{ color: "gray" }}>
                            <font size={'3'}>
                                <img src={'https://image.flaticon.com/icons/svg/727/727790.svg'} width={'18px'} height={'18px'}></img>Humidity:&nbsp;{this.state.current && this.state.current.humidity}%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img src={'https://image.flaticon.com/icons/svg/56/56086.svg'} width={'18px'} height={'18px'}></img> Wind:&nbsp;{this.state.current && this.state.current.wind_kph}km/h
                        </font>
                        </div>

                        <div align="center">
                            <span style={{ display: 'block' }}><font size={'4'}>{this.state.current && this.state.current.condition.text}</font></span>
                        </div>
                        <hr />

                        <div align="center">
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
                                        <div>
                                            <div style={{ float: 'left' }}>
                                                <div><font size={'5'}>&nbsp;&nbsp;&nbsp;&nbsp;{dayString}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
                                                <div align="left" style={{
                                                    color: "gray"
                                                }}><font size={'3'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{forecastDay.day.condition.text}</font></div>
                                                <div><font size={'3'}>&nbsp;</font></div>
                                            </div>
                                            <div style={{ float: 'right' }}>
                                                <div style={{ float: 'left' }}>
                                                    <img src={forecastDay.day.condition.icon} width={'50px'} height={'50px'}></img>
                                                </div>
                                                <div style={{ float: 'right' }}>
                                                    <div className="conditionText"><font size={'4'}><b>{forecastDay.day.maxtemp_c}&#176;&nbsp;&nbsp;&nbsp;&nbsp;</b></font></div>
                                                    <div className="conditionText"><font size={'3'}>{forecastDay.day.mintemp_c}&#176;&nbsp;&nbsp;&nbsp;&nbsp;</font></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }, this)
                            }
                            &nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    </div>
                </div>
            </div>
        );
    }
}