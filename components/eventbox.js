import React from "react";
import { Link } from "react-router-dom";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class EventBoxComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            curr: '',
            isLoading: true
        }
    }

    componentDidMount() {
        this.GetIt();
    }

    GetIt() {
        var latitude = localStorage.getItem('latitude');
        var longitude = localStorage.getItem('longitude');
        var location = localStorage.getItem('locationName');

        fetch('https://www.eventbriteapi.com/v3/events/search/?q=' + location + '&location.within=25km&location.latitude=' + latitude + '&location.longitude=' + longitude + '&token=MJN62TFZ2KMEP2RRRQYX')
            .then(res => res.json())
            .then(data => this.setState({
                data: data.events,
                isLoading: false
            }
            ));
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
                <Link style={{
                    textDecoration: 'none'
                }} to={{
                    pathname: "/moreEvents",
                    data: this.state.data
                }}>
                    <Button style={{
                        padding: '20px 8px'
                    }} size="medium" color="default">
                        <span style={{
                            fontSize: '20px',
                            fontStyle: 'italic',
                            fontFamily: 'cursive',
                            fontWeight: '600'
                        }}>Events Nearby</span>

                        {/* Replace the icon with material icon */}

                        {this.state.data && this.state.data.length > 5 && <span style={{
                            fontSize: '28px',
                            fontStyle: 'italic',
                            fontFamily: 'cursive',
                            fontWeight: '600',
                            padding: '5px'
                        }}>&#62;</span>}
                    </Button>
                </Link>
                <div className="abc">
                    {
                        this.state.data.map(function (event, i) {
                            if (i <= 4) {
                                return (
                                    <div className="event">
                                        <Card
                                            style={{
                                                height: '300px',
                                                width: '200px',
                                                padding: 'inherit',
                                                marginInlineEnd: '10px',
                                                marginTop: '5px',
                                                marginBottom: '10px',
                                                marginLeft: '12px',
                                                borderRadius: '10px',
                                            }} >
                                            <CardActionArea
                                                style={{
                                                    width: 'auto'
                                                }}>
                                                <CardMedia
                                                    component="img"
                                                    alt={event.name.text}
                                                    height="125px"
                                                    src={event.logo && event.logo.url}
                                                />
                                                <CardContent
                                                    style={{
                                                        height: "125px"
                                                    }}>
                                                    <Typography variant="subheading">
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