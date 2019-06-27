import React from "react";
import Button from '@material-ui/core/Button';
import { Redirect } from "react-router-dom";

export class MoreEventComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.location.data
        }
    }


    render() {
        window.scrollTo(0, 0); //fix for resetting scroll position.
        if (!this.state.data) {
            return <Redirect push to="/home" />;
        }
        var logoUrl = this.state.data.logo ? this.state.data.logo.url : "./nodata.png";
        return (
            <div>
                <div className="title_page">
                    {this.state.data.name.text}
                </div>

                <div style={{
                    marginTop: "20px",
                    overflow: "auto"
                }}>
                    <div style={{
                        float: 'left'
                    }}>
                        <img src={logoUrl}
                            height='200px'
                            style={{
                                borderRadius: '10px',
                                borderStyle: 'solid',
                                marginRight: '10px',
                                width: 'auto',
                                marginBottom: '10px'
                            }}
                        />
                    </div>
                    <div style={{
                        fontSize: "12pt",
                        fontWeight: "450",
                        marginLeft: "10px",
                        marginRight: "10px"
                    }}>
                        {this.state.data.description.text}

                        <div style={{
                            textAlign: 'center',
                            marginTop: '20px'
                        }}>
                            <Button
                                target="_blank"
                                href={this.state.data.url}
                                variant="primary"
                                variant="contained"
                                color="primary"
                                size="large"
                                style={{
                                    color: 'white'
                                }}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
