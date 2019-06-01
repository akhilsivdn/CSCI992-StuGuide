import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

export class MoreEventsPageComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data
        }
    }

    render() {
        window.scrollTo(0, 0);
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