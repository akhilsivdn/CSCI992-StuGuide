// import React from "react";

// export class MoreEventComponent extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             data: this.props.location.data
//         }

//         console.log(this.props.location.data);
//     }


//     render() {
//         return (
//         <div className="eventdetail">
//             <img src={this.state.data.logo.url}  height='250px'></img>
//             <hr />
//             <hr />
//             <div>{this.state.data.name.text}</div>
//             <hr />
//             <hr />
//             <div>{this.state.data.description.text}</div>
//             <hr />
//             <hr />
//             <a target="_blank"  href={this.state.data.url}>Book Now</a>
//         </div>
//         );
//     }
// }


import React from "react";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";


const theme = createMuiTheme({
    overrides: {
        // Name of the component ⚛️ / style sheet
        MuiButton: {
            // Name of the rule
            text: {
                // Some CSS
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            },
        },
    },

    palette: {
        type: 'dark', // Switching the dark mode on is a single property value change.
    },

    typography: { useNextVariants: true },
});


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
                <div>
                    <MuiThemeProvider theme={theme}>

                        <Paper elevation={1}>
                            <Typography variant="h5" component="h3">
                                <div>{this.state.data.name.text}</div>
                            </Typography>
                        </Paper>
                    </MuiThemeProvider>




                </div>
                <hr />
                <div>{this.state.data.description.text}</div>
                <hr />
                
                <a target="_blank"  href={this.state.data.url}></a>
                <MuiThemeProvider theme={theme}>
                    <Button>Book Now</Button>
                </MuiThemeProvider>
            </div>
        );
    }
}
