import React from "react";

import { GoogleApiWrapper } from "google-maps-react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import green from "@material-ui/core/colors/green";
import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import WalkIcon from "@material-ui/icons/DirectionsWalk";

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

//Not completed.
class TransportComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      origin: "",
      destination: "",
      template: ""
    };
  }

  componentDidMount() {}

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
    // var ori = 'University of Wollongong';
    // var depa = 'Penny Whistlers, Kiama'

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
          data: data.routes
        })
      )
      .then(() => {
        this.displayResults();
        console.log(this.state.data);
      });
  }

  shouldComponentUpdate() {
    return true;
  }

  displayResults() {
    const stylee = (
      <div className="searchResults">
        {this.state.data &&
          this.state.data.map(function(route, i) {
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
              <div className="searchResultsGrid showRoute" style={{marginTop: "30px"}}>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Search Result</Typography>
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

                {route.legs[0].steps.map(function(step, i) {
                  const deparrture_time_stop = step.transit_details ? (
                    <div className="transitBlock">
                      <Typography variant="h6">Transit Details:</Typography>

                      <span>
                        Take {step.transit_details.line.short_name}
                        from {step.transit_details.departure_stop.name}
                        at {step.transit_details.departure_time.text}
                      </span>
                      <span>
                        Arrive at {step.transit_details.arrival_stop.name}
                        at {step.transit_details.arrival_time.text}
                      </span>

                      {/*                                                    
                                                    <span>Transit departure stop: </span>
                                                    <span>Transit departure stop: </span> */}
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
                    <WalkIcon style={{filter: "brightness(0%)"}} />
                  );

                  const arrival_time_stop = step.transit_details
                    ? ""
                    : // <div>
                      //     <span>Transit arrival stop: {step.transit_details.arrival_stop.name}</span>
                      //     <span>Transit arrival stop: {step.transit_details.arrival_time.text}</span>
                      // </div>
                      "";

                  return (
                    <div className="searchResultsGrid showRoute">
                      <div className="stepId">
                        <ExpansionPanel>
                          <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                          >
                            <Avatar
                              className="avatar"
                              style={{
                                marginRight: "20px"
                              }}
                            >
                              {img_details}
                            </Avatar>

                            <Typography>
                              <Button
                                size="small"
                                variant="raised"
                                color="primary"
                              >
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

                      {/* <div>Step distance: {step.distance.text}</div>
                                                <div>Step duration: {step.duration.text}</div>
                                                <div>Travel mode: {step.travel_mode}</div> */}

                      {/* <div>Instruction: {step.html_instructions}</div> */}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    );

    this.setState({
      template: stylee
    });

    return stylee;
  }

  render() {
    return (
      <div className={this.props.root}>
        <form className={this.props.form}>
          <FormControl
            fullWidth
            style={{
              marginTop: "40px"
            }}
          >
            <TextField label="Start Point" onChange={e => this.SetOrigin(e)} />
            <br />
            <TextField
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
  })(TransportComponent)
);