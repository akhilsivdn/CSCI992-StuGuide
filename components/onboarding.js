import React from 'react';
import { AutoRotatingCarousel, Slide } from 'material-auto-rotating-carousel'

export class DemoCarousel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.setState({
            isOpen: !localStorage.getItem("isUserOnboared")
        })
    }

    Click() {
        localStorage.setItem("isUserOnboared", true)
        this.setState({
            isOpen: false
        })
    }

    render() {
        return (
            <AutoRotatingCarousel
                label="Get started" onStart={() => this.Click()}
                open={this.state.isOpen}>
                <Slide
                    media={<img src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/93-256.png" />}
                    mediaBackgroundStyle={{ backgroundColor: "#0c2340" }}
                    title="Find what's near you"
                    subtitle="StuGuide allows you to find nearby restaurants, groceries, hospitals etc."
                />
                <Slide
                    media={<img src="https://cdn1.iconfinder.com/data/icons/kitchen-37/512/cook_book_cookbook_recipe_kitchen_cutlery-256.png" />}
                    mediaBackgroundStyle={{ backgroundColor: "#0c2340" }}
                    title="Get easy and quick recipes"
                    subtitle="Away from home? Don't worry. StuGuide guides you cook simple recipes"
                />
                <Slide
                    media={<img src="https://cdn3.iconfinder.com/data/icons/glypho-free/64/weather-umbrella-dropletts-256.png" />}
                    mediaBackgroundStyle={{ backgroundColor: "#0c2340" }}
                    title="Get weather forecast"
                    subtitle="StuGuide gives you weather forecast for the week"
                />
            </AutoRotatingCarousel>
        );
    }
}