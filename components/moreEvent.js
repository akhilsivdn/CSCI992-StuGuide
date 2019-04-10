import React from "react";

export class MoreEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data
        }

        console.log(this.props.location.data);
    }


    render() {
        return (
        <div className="eventdetail">
            <img src={this.state.data.logo.url}  height='250px'></img>
            <hr />
            <hr />
            <div>{this.state.data.name.text}</div>
            <hr />
            <hr />
            <div>{this.state.data.description.text}</div>
            <hr />
            <hr />
            <a target="_blank"  href={this.state.data.url}>Book Now</a>
        </div>
        );
    }
}