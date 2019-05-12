import React from "react";
import { Link, Redirect } from "react-router-dom";
import config from 'react-global-configuration';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

export class MoreEventsPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data
        }

        console.log(this.props.location.data);
    }

    render() {
        if (!this.state.data) {
            return <Redirect push to="/home" />;
        }
        return (
            <div className="grid">
                {
                    this.state.data.map(function (event, i) {
                        if (i) {
                            return (
                                <div>
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
                                                height="210px"
                                                src={event.logo.url}
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
        );
    }
}