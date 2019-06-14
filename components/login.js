import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem } from '@material-ui/core';
import axios from 'axios';
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: '',
            userName: '',
            password: '',
            isLoading: false
        }
    }

    componentDidMount() {
        if (localStorage.getItem("key") != null) {
            this.props.history.push("/home");
        }
    }

    onChangeUserName(e) {
        if (e.target.value.length > 12) {
            this.setState({
                userNameErrorMessage: "Oops! maximum limit for username is 12"
            })
        }
        else {
            this.setState({
                userName: e.target.value,
                userNameErrorMessage: '',
                loginValidationMessage: ''
            })
        }
    }


    onChangePassword(e) {

        //TODO: Now max length set to 15, change later
        this.setState({
            password: e.target.value,
            passwordErrorMessage: e.target.value.length == 0 || e.target.value.length > 15 ? "Oops! Enter a password to continue" : '',
            loginValidationMessage: ''
        })
    }

    authenticate() {
        this.setState({
            isLoading: true
        });

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            username: this.state.userName,
            password: this.state.password
        };

        const axiosConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        var _this = this;

        var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/login";

        axios.post(url, transformRequest(postBody), axiosConfig)
            .then((res) => {
                if (res.status == 200) {
                    _this.setState({
                        isLoading: false
                    });

                    var token = res.headers.authorization;
                    // store the authentication key send from server response
                    localStorage.setItem('key', token);
                    if (_this.state.userName == "stuGuide" && _this.state.password == "admin") {
                        _this.props.history.push("/admin");
                    }
                    else {
                        _this.props.history.push("/home");
                    }
                } else {
                    _this.setState({
                        loginError: "Authentication Error: please check username/password combination"
                    })
                }
            }).catch(function (error) {
                _this.setState({
                    isLoading: false,
                    loginError: "Authentication Error: please check username/password combination or you are blocked by the admin"
                });
                console.log(error);
            });
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
                <Paper >
                    <Dialog
                        open="TRUE"
                        style={{
                            width: "100%",
                            display: "flex",
                            position: "relative",
                            justifyContent: "center",
                            maxWidth: "none"
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
                            }}
                        >Login</DialogTitle>
                        <Divider/>
                        <DialogContent
                            style={{
                                width: "600px",
                                height: "85%",
                                display: "flex",
                                position: "relative",
                                justifyContent: "center",
                                padding: "unset"

                            }}>
                            <List>
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
                                    paddingBottom: "unset",
                                    marginTop: "30px"
                                }}>
                                    <TextField style={{
                                        paddingTop: "0px"
                                    }}
                                        label="Username"
                                        value={this.state.userName}
                                        margin="dense"
                                        placeholder="Enter Username"
                                        type="text"
                                        name="username"
                                        onChange={(e) => this.onChangeUserName(e)} />
                                </ListItem>

                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.userNameErrorMessage}
                                </div>

                                <ListItem style={{
                                    paddingTop: "unset",
                                    paddingBottom: "unset"
                                }}>
                                    <TextField style={{
                                        paddingTop: "0px"
                                    }}
                                        label="Password"
                                        value={this.state.password}
                                        margin="dense"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password"
                                        onChange={(e) => this.onChangePassword(e)} />

                                </ListItem>

                                <div className="validationMessage" style={{ height: "auto" }}>
                                    {this.state.passwordErrorMessage}
                                </div>

                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center",
                                        paddingTop: "0px",

                                    }}>
                                    <Button disabled={this.state.userName.length == 0 ||
                                        this.state.password.length == 0} onClick={() => this.authenticate()}
                                        size="large"
                                        color="primary"
                                        variant="contained"
                                        style={{ width: "200px" }}>Login</Button>
                                </ListItem>

                                <div className="validationMessage loginValidationMessage" style={{
                                    height: "auto",
                                    marginBottom: "unset"
                                }}>
                                    {this.state.loginError}
                                </div>

                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center"
                                    }}>
                                    <span >
                                        <Link to={'/forgot-password'}>
                                            Forgot Password?
                                </Link>
                                    </span>
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
                                Need an account?&nbsp;
                            <Link to={'/register'}>
                                    Sign up
                            </Link>
                            </span>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div >

        );
    }
}