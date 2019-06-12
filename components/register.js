import React from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";
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
            emailErrorMessage: "",
            passwordErrorMessage: "",
            confirmPasswordErrorMessage: "",
            usernameErrorMessage: "",
            registerationErrorMessage: "",
            recaptchaValid: false,
            isLoading: false
        };
    }


    handleSubmit() {

        if (this.state.registerationErrorMessage.length > 0) {
            this.setState({
                registerationErrorMessage: ""
            })
        }

        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(String(this.state.emailID).toLowerCase())) {
            this.setState({
                emailErrorMessage: "please enter a valid email address"
            })
            return;
        }

        if (this.state.username.length < 5 || this.state.username.length > 12) {
            this.setState({
                usernameErrorMessage: "user name must be 5-12 characters long"
            })
            return;
        }

        if (this.state.password.length < 5) {
            this.setState({
                passwordErrorMessage: "password too small. minimum 5 characters needed"
            })
            return;
        }

        if (this.state.password != this.state.confirmpassword) {
            this.setState({
                confirmPasswordErrorMessage: "passwords don't match"
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
            password_confirm: this.state.confirmpassword
        };

        var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/register"
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
                registerationErrorMessage: error
            })
            console.log(error);
        });
    }

    onChangeEmail(e) {
        if (this.state.emailErrorMessage.length > 0) {
            this.setState({
                emailErrorMessage: ""
            })
        }
        this.setState({
            emailID: e.target.value
        })
    }

    onChangePassword(e) {
        if (this.state.passwordErrorMessage.length > 0) {
            this.setState({
                passwordErrorMessage: ""
            })
        }
        this.setState({
            password: e.target.value
        })
    }

    onChangeUsername(e) {
        if (this.state.usernameErrorMessage.length > 0) {
            this.setState({
                usernameErrorMessage: ""
            })
        }
        this.setState({
            username: e.target.value
        })
    }

    onChangeConfirmPwd(e) {
        if (this.state.confirmPasswordErrorMessage.length > 0) {
            this.setState({
                confirmPasswordErrorMessage: ""
            })
        }
        this.setState({
            confirmpassword: e.target.value
        })
    }

    onChangeRecaptcha() {
        this.setState({
            recaptchaValid: true
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
                                        label="E-mail" onChange={(e) => this.onChangeEmail(e)}
                                        value={this.state.emailID} margin="dense"
                                        placeholder="Enter e-mail"
                                        type="text"
                                        name="email" />

                                </ListItem>
                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.emailErrorMessage}
                                </div>
                                <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                    <TextField onChange={(e) => this.onChangeUsername(e)}
                                        value={this.state.username} label="Username"
                                        margin="dense"
                                        placeholder="Enter Username"
                                        type="text"
                                        name="username" />
                                </ListItem>
                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.usernameErrorMessage}
                                </div>
                                <ReCAPTCHA
                                    sitekey="6LeeYagUAAAAAAD2QaI4B8C3XoJL8q4mT-Sx9fJw"
                                    onChange={this.onChangeRecaptcha}
                                />
                                <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                    <TextField onChange={(e) => this.onChangePassword(e)}
                                        value={this.state.password} label="Password"
                                        margin="dense"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password" />
                                </ListItem>
                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.passwordErrorMessage}
                                </div>
                                <ListItem style={{
                                    paddingTop: "unset"
                                }}>
                                    <TextField onChange={(e) => this.onChangeConfirmPwd(e)}
                                        value={this.state.confirmpassword} label="Confirm Password"
                                        margin="dense"
                                        placeholder="Confirm Password"
                                        type="password"
                                        name="password_confirm" />
                                </ListItem>
                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.confirmPasswordErrorMessage}
                                </div>
                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center"
                                    }}>
                                    <Button disabled={this.state.emailID.length == 0 ||
                                        this.state.username.length == 0 ||
                                        this.state.password.length == 0 ||
                                        this.state.confirmpassword.length == 0 || this.state.recaptchaValid}
                                        size="large"
                                        color="primary"
                                        variant="contained" onClick={() => this.handleSubmit()}>Register</Button>
                                </ListItem>
                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.registerationErrorMessage}
                                </div>
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
        );
    }
}