import React from "react";
import { Link } from "react-router-dom";
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
    }

    componentDidMount() {
        this.GetIt();
    }

    GetIt() {
        var latitude = localStorage.getItem('latitude');
        var longitude = localStorage.getItem('longitude');
        var location = localStorage.getItem('locationName');

        fetch('https://www.eventbriteapi.com/v3/events/search/?q=' + location + '&location.within=50km&location.latitude=' + latitude + '&location.longitude=' + longitude + '&token=MJN62TFZ2KMEP2RRRQYX')
            .then(res => res.json())
            .then(data => this.setState({
                data: data.events
            }
            ));
    }
    
    render() {
        return (
            <div>
                <Link style={{
                    'text-decoration': 'none'
                }} to={{
                    pathname: "/moreEvents",
                    data: this.state.data
                }}>
                    <Button style={{
                        'padding': '20px 8px'
                    }} size="medium" color="default">
                        <span style={{
                            'font-size': '20px',
                            'font-style': 'italic',
                            'font-family': 'cursive',
                            'font-weight': '600'
                        }}>Events Nearby</span>

                        {/* Replace the icon with material icon */}

                        {this.state.data && this.state.data.length > 4 && <span style={{
                            'font-size': '28px',
                            'font-style': 'italic',
                            'font-family': 'cursive',
                            'font-weight': '600',
                            'padding': '5px'
                        }}>&#62;</span>}
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