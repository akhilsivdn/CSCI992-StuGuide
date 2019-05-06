import React from "react";
import { Link } from "react-router-dom";
import config from 'react-global-configuration';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
// import shadows from "@material-ui/core/styles/shadows";

export class EventBoxComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: ''
        }
        this.GetIt();
    }

    componentDidMount() {

    }

    GetIt() {
        var latitude = config.get('latitude');
        var longitude = config.get('longitude');
        var location = config.get('locationName');

        //need to change {place} later
        fetch('https://www.eventbriteapi.com/v3/events/search/?q=' + location + '&location.within=50km&location.latitude=' + latitude + '&location.longitude=' + longitude + '&token=MJN62TFZ2KMEP2RRRQYX')
            .then(res => res.json())
            .then(data => this.setState({
                data: data.events
            }
            ));
    }



    render() {

        let number = this.state.data.length;

        if (number > 4) {
            return (
                <div>
                    <Link to={{
                        pathname: "/moreEvents",
                        data: this.state.data
                    }}>
                        <Button size="medium" color="default">
                            Events Nearby
                        </Button>
                    </Link>
                    <div className="abc">
                        {
                            this.state.data.map(function (event, i) {
                                if (i < 4) {
                                    return (
                                        <div className="event">
                                            <Card
                                                style={{
                                                    height: '400px',
                                                    padding: 'inherit',
                                                    marginInlineEnd: '20px',
                                                    marginTop: '5px',
                                                    marginBottom: '10px',
                                                    marginLeft: '7px',
                                                    borderRadius: '10px',
                                                }} >
                                                <CardActionArea
                                                    style={{
                                                        width: "250px"
                                                    }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        // className={classes.media}
                                                        height="210px"
                                                        src={event.logo.url}
                                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                                    // title="Contemplative Reptile" ask akhil
                                                    />
                                                    <CardContent
                                                        style={{
                                                            height: "125px"
                                                        }}>
                                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                                        Ask Akhil
                                            </Typography> */}
                                                        <Typography variant="subheading"
                                                        >
                                                            {event.name.text}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Link to={{
                                                        pathname: "/more",
                                                        data: event
                                                    }}>
                                                        <Button size="small" color="primary">
                                                            Know More
                                                        </Button>
                                                    </Link>
                                                </CardActions>
                                            </Card>

                                            {/* <img src={event.logo.url} width='200px' height='210px'></img>
                                        <div>{event.name.text}</div>
                                        <Link to={{
                                            pathname: "/more",
                                            data: event
                                        }}>
                                            <button className="buttonClass">more</button>
                                        </Link> */}
                                        </div>
                                    );
                                }
                            })
                        }
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <span>
                        Events Nearby..
                    </span>
                    <div className="abc">
                        {
                            this.state.data.map(function (event, i) {
                                if (i < 4) {
                                    return (
                                        <div className="event">
                                            <Card
                                                style={{
                                                    height: '400px',
                                                    padding: 'inherit',
                                                    marginInlineEnd: '20px',
                                                    marginTop: '5px',
                                                    marginBottom: '10px',
                                                    marginLeft: '10px',
                                                    borderRadius: '10px',
                                                }} >
                                                <CardActionArea
                                                    style={{
                                                        width: "250px"
                                                    }}>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Contemplative Reptile"
                                                        // className={classes.media}
                                                        height="210px"
                                                        src={event.logo.url}
                                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                                    // title="Contemplative Reptile" ask akhil
                                                    />
                                                    <CardContent
                                                        style={{
                                                            height: "125px"
                                                        }}>
                                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                                        Ask Akhil
                                            </Typography> */}
                                                        <Typography variant="subheading"
                                                        >
                                                            {event.name.text}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Link to={{
                                                        pathname: "/more",
                                                        data: event
                                                    }}>
                                                        <Button size="small" color="primary">
                                                            Know More
                                                </Button>
                                                    </Link>
                                                </CardActions>
                                            </Card>

                                            {/* <img src={event.logo.url} width='200px' height='210px'></img>
                                        <div>{event.name.text}</div>
                                        <Link to={{
                                            pathname: "/more",
                                            data: event
                                        }}>
                                            <button className="buttonClass">more</button>
                                        </Link> */}
                                        </div>
                                    );
                                }

                            })
                        }
                    </div>
                </div>
            )
        }
    }
}