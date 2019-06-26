import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Divider } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailID: "",
            password: "",
            username: "",
            confirmpassword: "",
            registerationErrorMessage: "",
            isLoading: false,
            firstName: "",
            lastName: ""
        };
    }

    handleSubmit() {

        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }

        if (this.state.firstName.length < 3) {
            this.setState({
                registerationErrorMessage: "first name too small"
            })
            return;
        }

        if (this.state.lastName.length < 3) {
            this.setState({
                registerationErrorMessage: "last name too small"
            })
            return;
        }

        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(String(this.state.emailID).toLowerCase())) {
            this.setState({
                registerationErrorMessage: "please enter a valid email address"
            })
            return;
        }

        if (this.state.username.length < 5 || this.state.username.length > 12) {
            this.setState({
                registerationErrorMessage: "user name must be 5-12 characters long"
            })
            return;
        }

        if (this.state.password.length < 5) {
            this.setState({
                registerationErrorMessage: "password too small. minimum 5 characters needed"
            })
            return;
        }

        var validPassword = (/^([a-zA-Z0-9]+)$/.test(this.state.password.toLowerCase()) && /\d/.test(this.state.password.toLowerCase()) &&
            /[A-Z]/i.test(this.state.password.toLowerCase()))
        if (!validPassword) {
            this.setState({
                registerationErrorMessage: "Please should be a combination of characters and numbers"
            })
            return;
        }

        if (this.state.password != this.state.confirmpassword) {
            this.setState({
                registerationErrorMessage: "passwords don't match"
            })
            return;
        }

        this.setState({
            isLoading: true
        })

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            username: this.state.username,
            email: this.state.emailID,
            password: this.state.password,
            password_confirm: this.state.confirmpassword,
            first_name: this.state.firstName,
            last_name: this.state.lastName
        };

        var url = localStorage.getItem("baseUrl") + "api/v1/auth/register"
        var _this = this;

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        ).then(function (response) {
            if (response.data.status == 'success') {
                _this.setState({
                    isLoading: false
                })
                _this.props.history.push("/"); //send user to login page
            }
            else if (response.data.code == 500 || response.data.status == 'error') {
                _this.setState({
                    registerationErrorMessage: "User details already found in Database. Please try again",
                    isLoading: false
                })
            }
            else {
                _this.setState({
                    registerationErrorMessage: response.data.payload.error,
                    isLoading: false
                })
            }
        }).catch(function (error) {
            _this.setState({
                isLoading: false,
                registerationErrorMessage: error.message
            })
            console.log(error);
        });
    }

    onChangeEmail(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            emailID: e.target.value
        })
    }

    onChangePassword(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            password: e.target.value
        })
    }

    onChangeUsername(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            username: e.target.value
        })
    }

    onChangeConfirmPwd(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            confirmpassword: e.target.value
        })
    }

    onChangeFName(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLName(e) {
        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }
        this.setState({
            lastName: e.target.value
        })
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
            <div className="loginSection" >
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
                                justifyContent: "center",
                                fontSize: 'large',
                                fontWeight: '400',
                                backgroundColor: 'rgba(0, 0, 0, .03)',
                                borderBottom: '1px solid rgba(0, 0, 0, .125)'
                            }}>
                            Register
                            </DialogTitle>
                        <Divider />
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
                                        height: "125px",
                                        width: "125px",
                                        borderRadius: "20%",
                                        display: "block",
                                        margin: "0 auto"
                                    }} />
                                </ListItem>

                                <div style={{
                                    paddingTop: "unset",
                                    marginTop: "5px",
                                    float: "left",
                                    marginLeft: "5%"
                                }}>
                                    <TextField
                                        label="First Name" onChange={(e) => this.onChangeFName(e)}
                                        value={this.state.firstName} margin="dense"
                                        placeholder="Enter first name"
                                        type="text"
                                        name="firstname" />
                                </div>

                                <div style={{
                                    paddingTop: "unset",
                                    marginTop: "5px",
                                    float: "right",
                                    marginRight: "5%"
                                }}>
                                    <TextField
                                        label="Last Name" onChange={(e) => this.onChangeLName(e)}
                                        value={this.state.lastName} margin="dense"
                                        placeholder="Enter last name"
                                        type="text"
                                        name="lastname" />
                                </div>



                                <div style={{
                                    paddingTop: "unset",
                                    float: "left",
                                    marginLeft: "5%"
                                }}>
                                    <TextField onChange={(e) => this.onChangeUsername(e)}
                                        value={this.state.username} label="Username"
                                        margin="dense"
                                        placeholder="Enter Username"
                                        type="text"
                                        name="username" />
                                </div>

                                <div style={{
                                    paddingTop: "unset",
                                    float: "right",
                                    marginRight: "5%"

                                }}>
                                    <TextField
                                        label="E-mail" onChange={(e) => this.onChangeEmail(e)}
                                        value={this.state.emailID} margin="dense"
                                        placeholder="Enter e-mail"
                                        type="text"
                                        name="email" />

                                </div>

                                <div style={{
                                    paddingTop: "unset",
                                    float: "left",
                                    marginLeft: "5%"
                                }}>
                                    <TextField onChange={(e) => this.onChangePassword(e)}
                                        value={this.state.password} label="Password"
                                        margin="dense"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password" />
                                </div>

                                <div style={{
                                    paddingTop: "unset",
                                    float: "right",
                                    marginRight: "5%"
                                }}>
                                    <TextField onChange={(e) => this.onChangeConfirmPwd(e)}
                                        value={this.state.confirmpassword} label="Confirm Password"
                                        margin="dense"
                                        placeholder="Confirm Password"
                                        type="password"
                                        name="password_confirm" />
                                </div>
                            </List>
                        </DialogContent>
                        <div style={{
                            display: "flex",
                            position: "relative",
                            justifyContent: "center",
                        }}>
                            <Button disabled={this.state.firstName.length == 0 ||
                                this.state.lastName.length == 0 ||
                                this.state.emailID.length == 0 ||
                                this.state.username.length == 0 ||
                                this.state.password.length == 0 ||
                                this.state.confirmpassword.length == 0}
                                size="large"
                                color="primary"
                                variant="contained" onClick={() => this.handleSubmit()}>Register</Button>
                        </div>
                        <div className="validationMessage" style={{ height: "auto" }}>
                            {this.state.registerationErrorMessage}
                        </div>
                        <div
                            style={{
                                display: "flex",
                                position: "relative",
                                justifyContent: "center",
                                marginBottom: "20px"
                            }}>
                            <span>
                                Already a member?&nbsp;
                            <Link to={'/'}>
                                    Sign In
                            </Link>
                            </span>
                        </div>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}