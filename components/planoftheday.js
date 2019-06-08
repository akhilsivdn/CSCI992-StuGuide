import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

import Card from "@material-ui/core/Card";
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export class PlanoftheDayComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            itineraryItems: [],
            isLoading: true
        }

    }

    componentDidMount() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let dateText = year + "-" + month + "-" + date;
        this.GetIt(dateText);
    }

    GetIt(dateText) {
        const url = 'https://www.triposo.com/api/20181213/day_planner.json?location_id=Wollongong&max_distance=50&account=WQR7PI47&token=5rsw9thr4cz8eqgww24i4s2gql9cewn7&start_date=' + dateText + '&end_date=' + dateText;
        fetch(url).then(res => res.json())
            .then(data => this.setState({
                itineraryItems: data.results[0].days[0].itinerary_items,
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
                <div className="title_page">Plan for the day</div>
                {
                    this.state.itineraryItems.map(function (itineraryItem, i) {
                        let poi = itineraryItem.poi;
                        return (
                            <div>
                                <Card style={{ marginTop: "20px" }}>

                                    <div style={{
                                        float: "right",
                                        padding: "20px"
                                    }}>
                                        <img className="itinerary_image" src={poi.images[0] && poi.images[0].sizes.medium.url} height='250px' width='350px' />
                                    </div>

                                    <CardContent>
                                        <Typography variant="h5">
                                            {itineraryItem.title}
                                        </Typography>

                                        <div className="itinerary_place_name">{poi.name}</div>

                                        <div className="itinerary_description">{itineraryItem.description}</div>
                                       
                                        <div style={{ marginTop: "20px" }}>
                                            <Button variant="outlined" color="primary"><a href='' target="_blank">Get Directions</a></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )
                    })
                }

            </div>
        );
    }
}