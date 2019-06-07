import React from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Checkbox } from '@material-ui/core';

export class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    myFunction() {

    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        var _this = this;
        event.preventDefault();

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const data = new FormData(event.target);
        const postBody = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            password_confirm: data.get('password_confirm')
        };

        //change this later after service is pushed live
        var isDebug = true;
        var url = isDebug ? 'http://124.168.38.203:82/api/v1/auth/register' : '/api/v1/auth/register'

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        ).then(function (response) {
            if (response.data.status === 'success') {
                _this.setState({
                    redirect: true
                });
            } else {
                alert(response.data.payload.error)
            }
        }).catch(function (error) {
            // handle error
            console.log(error);
        });
    }

    render() {

        //redirect to login on succesful registration.
        if (this.state.redirect) {
            return <Redirect push to="/login" />;
        }
        return (
            <form onSubmit={this.handleSubmit}>

                <div className="loginSection">
                    <Paper>
                        <Dialog
                            open="TRUE"
                            style={{
                                width: "100%",
                                display: "flex",
                                position: "relative",
                                justifyContent: "center"
                            }}>
                            <DialogTitle
                                id="form-dialog-title"
                                style={{
                                    display: "flex",
                                    position: "relative",
                                    justifyContent: "center"
                                }}>
                                Register
                            </DialogTitle>

                            <DialogContent
                                style={{
                                    width: "600px",
                                    display: "flex",
                                    position: "relative",
                                    justifyContent: "center"
                                }}>
                                <List>
                                    {/* Logo */}
                                    <ListItem >
                                        <img src="./red_bg_logo.jpg" style={{
                                            height: "150px",
                                            width: "150px",
                                            borderRadius: "20%",
                                            display: "block",
                                            margin: "0 auto"
                                        }} />
                                    </ListItem>

                                    <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "20px"
                                }}>
                                        <TextField
                                            label="E-mail"
                                            margin="dense"
                                            placeholder="Enter e-mail"
                                            type="text"
                                            name="email" />
                                    </ListItem>

                                    <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                        <TextField
                                            label="Username"
                                            margin="dense"
                                            placeholder="Enter Username"
                                            type="text"
                                            name="username" />
                                    </ListItem>

                                    <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                        <TextField
                                            label="Password"
                                            margin="dense"
                                            placeholder="Enter Password"
                                            type="password"
                                            name="password" />
                                    </ListItem>

                                    <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                        <TextField
                                            label="Confirm Password"
                                            margin="dense"
                                            placeholder="Confirm Password"
                                            type="password"
                                            name="password_confirm" />
                                    </ListItem>

                                    <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                        <React.Fragment>
                                            <Checkbox
                                                nativeControlId='my-checkbox'
                                            />
                                            <label style={{marginBottom: "0px"}} htmlFor='my-checkbox'>Is Admin ?</label>
                                        </React.Fragment>
                                    </ListItem>

                                    <ListItem
                                        style={{
                                            display: "flex",
                                            position: "relative",
                                            justifyContent: "center"
                                        }}>
                                        <Link to={'/'}>
                                            <Button
                                                size="large"
                                                color="primary"
                                                variant="contained">Register</Button>
                                        </Link>
                                    </ListItem>
                                </List>
                            </DialogContent>
                            <DialogActions
                                style={{
                                    display: "flex",
                                    position: "relative",
                                    justifyContent: "center"
                                }}>
                                <span>
                                    Already a member?&nbsp;
                            <Link to={'/'}>
                                        Sign In
                            </Link>
                                </span>
                            </DialogActions>
                        </Dialog>
                    </Paper>
                </div>
            </form>

        );
    }
}