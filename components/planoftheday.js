import React from "react";


export class PlanoftheDayComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            itineraryItems: []
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
                itineraryItems: data.results[0].days[0].itinerary_items
            }
            ));
    }

    render() {
        return (
            <div>
                <div className="title_page">Plan for the day</div>
                {
                    this.state.itineraryItems.map(function (itineraryItem, i) {
                        let poi = itineraryItem.poi;
                        return (
                            <div>
                                <div className="itinerary_title">{itineraryItem.title}</div>
                                <hr />
                                <img className="itinerary_image" src={poi.images[0] && poi.images[0].sizes.medium.url} height='250px' width='500px' />
                                <div className="itinerary_place_name">{poi.name}</div>
                                <hr />
                                <div className="itinerary_description">{itineraryItem.description}</div>
                                <hr />
                                <div>
                                    <button className="itinerary_button"><a href='' target="_blank">Get Directions</a></button>
                                </div>

                            </div>
                        )
                    })
                }

            </div>
        );
    }
}