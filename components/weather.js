import React from "react";

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
        var location = localStorage.getItem("locationName");
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
            <div className="bg" style={{
                'margin-top': '20px',
                'margin-bottom': '20px'
            }}>
                {/* LOGO */}
                <img className="logo" src="./white_bg_logo.png"
                    height='180px' width='180px' />
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