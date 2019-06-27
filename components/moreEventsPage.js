import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import ScrollToTop from "react-scroll-up";

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
        var location = localStorage.getItem("locationName")
        return (
            <div>
                <div className="title_page">More events near {location}..</div>
                <ScrollToTop showUnder={500} duration={1000}>
                    <img src="https://cdn2.iconfinder.com/data/icons/essential-web-1-1/50/arrow-circle-up-angle-top-256.png"
                        style={{ height: "50px", width: "50px" }} />
                </ScrollToTop>
                <div className="grid">
                    {
                        this.state.data.map(function (event, i) {
                            var logoUrl = event.logo ? event.logo.url : "./nodata.png";
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
                                                src={logoUrl}
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
                        )
                    }
                </div>
            </div >
        );
    }
}