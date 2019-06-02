import React from "react";
import { GoogleApiWrapper } from 'google-maps-react';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class TransportComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            origin: '',
            destination: '',
            template: '',
            noRoutesAvailable: false
        }
    }

    SetOrigin(e) {
        this.setState({
            origin: e.target.value
        });
    }
    SetDestination(e) {
        this.setState({
            destination: e.target.value
        });
    }


    GetTransitData(e) {
        this.setState({
            isLoading: true
        })

        // var ori = 'University of Wollongong';
        // var depa = 'Penny Whistlers, Kiama'

        var ori = this.state.origin;
        var depa = this.state.destination;


        //allow-cross-origin header problem. so this fix. will change if we get some time later.
        const url = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=' + ori + '&destination=' + depa + '&mode=transit&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0';
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({
                data: data.routes,
                noRoutesAvailable: data.status == "ZERO_RESULTS"
            }
            )).then(() => {
                this.displayResults();
            })
    }

    shouldComponentUpdate() {
        return true;
    }


    displayResults() {
        if (this.state.noRoutesAvailable) {
            const stylee = (
                <div className="searchResults" style={{ textAlign: "center" }}>
                    <span style={{
                        display: "block",
                        fontSize: "24px",
                        fontWeight: "500",
                        marginBottom: "20px"
                    }}>Oops ! No public transport routes found. Please check your query</span>
                    <img src="./noresults.png" width="250px" height="250px" />
                </div>
            );
            this.setState({
                template: stylee,
                isLoading: false
            }
            );
        }
        else {
            const stylee = (
                <div className="searchResults">
                    {
                        this.state.data && this.state.data.map(function (route, i) {
                            var deptime = route.legs[0].departure_time ?
                                (<div>Departure time: {route.legs[0].departure_time.text}</div>) : '';
                            var arrtime = route.legs[0].arrival_time ?
                                (<div>Arrival time: {route.legs[0].arrival_time.text}</div>) : '';
                            return (
                                <div className="searchResultsGrid showRoute">
                                    {deptime}
                                    {arrtime}
                                    <div>Total distance: {route.legs[0].distance.text}</div>
                                    <div>Total duration: {route.legs[0].duration.text}</div>
                                    {
                                        route.legs[0].steps.map(function (step, i) {

                                            const deparrture_time_stop = step.transit_details
                                                ? (
                                                    <div className="transitBlock">
                                                        <span>Transit details</span>
                                                        <img src={step.transit_details.line.vehicle.icon} height='50px' width='50px' />
                                                        <span>
                                                            Take {step.transit_details.line.short_name}
                                                            from {step.transit_details.departure_stop.name}
                                                            at {step.transit_details.departure_time.text}
                                                        </span>
                                                        <span>Arrive at {step.transit_details.arrival_stop.name}
                                                            at {step.transit_details.arrival_time.text}
                                                        </span>
                                                    </div>
                                                )
                                                : '';

                                            const arrival_time_stop = step.transit_details
                                                ? (
                                                    ''
                                                    // <div>
                                                    //     <span>Transit arrival stop: {step.transit_details.arrival_stop.name}</span>
                                                    //     <span>Transit arrival stop: {step.transit_details.arrival_time.text}</span>
                                                    // </div>
                                                )
                                                : '';


                                            return (

                                                <div className="searchResultsGrid showRoute">
                                                    <div className="stepId">Step {i + 1}</div>

                                                    <div>
                                                        <span className="durationText"> {step.duration.text} : </span>
                                                        <span>{step.html_instructions}</span>
                                                    </div>

                                                    {/* <div>Step distance: {step.distance.text}</div>
                                                <div>Step duration: {step.duration.text}</div>
                                                <div>Travel mode: {step.travel_mode}</div> */}

                                                    {deparrture_time_stop}
                                                    {arrival_time_stop}

                                                    {/* <div>Instruction: {step.html_instructions}</div> */}
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            );

            this.setState({
                template: stylee,
                isLoading: false
            }
            );
        }
    }

    render() {

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

                <input type="text" className="form-control form-control-lg" placeholder="Type in your starting point"
                    onChange={(e) => this.SetOrigin(e)} />

                <input type="text" className="form-control form-control-lg" placeholder="Type in your destination point"
                    onChange={(e) => this.SetDestination(e)} />

                <button className="getTransitButton" onClick={(e) => this.GetTransitData(e)}>Calculate transit data</button>

                {this.state.template}

            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0'
})(TransportComponent);