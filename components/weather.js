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
                condtnText: data.current.condition.text,
                humidity: data.current.humidity
            }
            ));
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

    render() {
        let newDate = new Date();
        let dayText = this.DisplayDayoftheWeek(newDate.getDay());

        return (
            <div>
                {/* <img src="data:image/png;base64,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"
                    height='180px' width='180px' /> */}
                <div className="weatherDiv">

                    <div>
                        <tr> </tr>
                        <div><h4><b>{this.state.name}</b></h4></div>
                        <div><font color={'grey'}>{dayText}, {this.state.condtnText}</font></div>
                        <div>
                            <span style={{
                                fontSize: '30px'
                            }}><b>{this.state.temp}</b></span>
                            <span style={{
                                fontSize: '30px'
                            }}><b>&#8451;</b></span>
                        </div>
                        <div><font color={'black'}>
                            <img src={'https://image.flaticon.com/icons/svg/1404/1404885.svg'} width={'25px'} height={'30px'}></img>Humidity: {this.state.humidity}%
                        <img style={{
                                marginLeft: '20px'
                            }} src={'https://image.flaticon.com/icons/svg/56/56086.svg'} width={'25px'} height={'30px'}></img> Wind: {this.state.wind}km/h</font></div>
                        <tr> </tr>
                    </div>
                    <div>
                        <tr> </tr>
                        <img src={this.state.image} width={'140px'} height={'140px'}></img>
                    </div>
                    <div></div>

                </div>
            </div>
        );
    }
}