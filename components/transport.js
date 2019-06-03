import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import WalkIcon from "@material-ui/icons/DirectionsWalk";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

const styles = theme => ({
    avatar: {
        margin: 10,
        color: "#fff",
        backgroundColor: green[500]
    },
    getTransitButton: {
        margin: 10
    },
    root: {
        margin: "auto",
        maxWidth: 400,
        paddingTop: 40
    },
    form: {
        paddingTop: 40,
        padding: 30
    }
});

class TransportComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            origin: '',
            destination: '',
            template: '',
            noRoutesAvailable: false
        };
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
        var ori = this.state.origin;
        var depa = this.state.destination;

        //allow-cross-origin header problem. so this fix. will change if we get some time later.
        const url =
            "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/directions/json?origin=" +
            ori +
            "&destination=" +
            depa +
            "&mode=transit&key=AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0";
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data =>
                this.setState({
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
                    {this.state.data &&
                        this.state.data.map(function (route, i) {
                            var deptime = route.legs[0].departure_time ? (
                                <div>Departure time: {route.legs[0].departure_time.text}</div>
                            ) : (
                                    ""
                                );
                            var arrtime = route.legs[0].arrival_time ? (
                                <div>Departure time: {route.legs[0].arrival_time.text}</div>
                            ) : (
                                    ""
                                );
                            var dep_place = route.legs[0].start_address;
                            var end_place = route.legs[0].end_address;

                            return (
                                <div className="searchResultsGrid showRoute" style={{ marginTop: "30px" }}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h5">Trip Summary</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography color="textSecondary">
                                                {dep_place} {<KeyboardArrowRight />}
                                                {<KeyboardArrowRight />}
                                                {<KeyboardArrowRight />} {end_place}
                                                {deptime}
                                                {arrtime}
                                                <div>Total distance: {route.legs[0].distance.text}</div>
                                                <div>Total duration: {route.legs[0].duration.text}</div>
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>

                                    {route.legs[0].steps.map(function (step, i) {
                                        const deparrture_time_stop = step.transit_details ? (
                                            <div className="transitBlock">
                                                <Typography variant="h6">Transit Details</Typography>

                                                <span>
                                                    Take {step.transit_details.line.short_name}
                                                    from {step.transit_details.departure_stop.name}
                                                    at {step.transit_details.departure_time.text}
                                                </span>
                                                <span>
                                                    Arrive at {step.transit_details.arrival_stop.name}
                                                    at {step.transit_details.arrival_time.text}
                                                </span>
                                            </div>
                                        ) : (
                                                ""
                                            );

                                        const img_details = step.transit_details ? (
                                            <div className="transitBlock">
                                                <img
                                                    src={step.transit_details.line.vehicle.icon}
                                                    height="30px"
                                                    width="30px"
                                                />
                                            </div>
                                        ) : (
                                                <WalkIcon style={{ filter: "brightness(0%)" }} />
                                            );

                                        const expandIcon = deparrture_time_stop ? (<ExpandMoreIcon />) : '';

                                        return (
                                            <div className="searchResultsGrid showRoute">
                                                <div className="stepId">
                                                    <ExpansionPanel>
                                                        <ExpansionPanelSummary
                                                            expandIcon={expandIcon}>
                                                            <Avatar
                                                                className="avatar"
                                                                style={{
                                                                    marginRight: "20px"
                                                                }}>
                                                                {img_details}
                                                            </Avatar>

                                                            <Typography>
                                                                <Button
                                                                    size="small"
                                                                    variant="raised"
                                                                    color="primary">
                                                                    Step {i + 1}
                                                                </Button>
                                                                <span className="durationText">
                                                                    {" "}
                                                                    {step.duration.text} :{" "}
                                                                </span>
                                                                <span>{step.html_instructions}</span>
                                                            </Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <Typography>{deparrture_time_stop}</Typography>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                </div>
            );

            this.setState({
                template: stylee,
                isLoading: false
            });
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
            <div className={this.props.root}>
                <div className="title_page">Search for public transport between two places..</div>
                <form className={this.props.form}>
                    <FormControl
                        fullWidth
                        style={{
                            marginTop: "40px"
                        }}
                    >
                        <TextField value={this.state.origin} label="Start Point" onChange={e => this.SetOrigin(e)} />
                        <br />
                        <TextField value={this.state.destination}
                            label="Destination point"
                            onChange={e => this.SetDestination(e)}
                        />
                        <br />
                        <Button
                            variant="raised"
                            color="primary"
                            className={this.props.getTransitButton}
                            onClick={e => this.GetTransitData(e)}
                            style={{
                                width: "150px",
                                display: "block",
                                margin: " 0 auto"
                            }}
                        >
                            Calculate
            </Button>

                        {this.state.template}
                    </FormControl>
                </form>

            </div>
        );
    }
}

export default withStyles(styles)(
    GoogleApiWrapper({
        apiKey: "AIzaSyBi99vISytb1d0NAogNjpwgGy_wElH2ly0"
    })(TransportComponent));