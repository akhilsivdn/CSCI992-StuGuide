import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@material-ui/core';
import jwt from 'jsonwebtoken';

export class LoginComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: '',
            userName: '',
            password: '',
            disableButton: false //Set to true when API is up.
        }
    }

    onChangeUserName(e) {
        if (e.target.value.length > 12) {
            this.setState({
                userNameErrorMessage: "Oops! maximum limit for username is 12",
                disableButton: true
            })
        }
        else {
            this.setState({
                userName: e.target.value,
                userNameErrorMessage: '',
                loginValidationMessage: '',
                disableButton: e.target.value.length == 0 ? true : false
            })
        }
    }


    onChangePassword(e) {

        //TODO: Now max length set to 15, change later
        this.setState({
            password: e.target.value,
            passwordErrorMessage: e.target.value.length == 0 || e.target.value.length > 15 ? "Oops! Enter a password to continue" : '',
            disableButton: e.target.value.length == 0 || e.target.value.length > 15 ? true : false,
            loginValidationMessage: ''
        })
    }

    /**
    * Authenticate for user login
    * 
    * @return void
    */
    authenticate() {

        //TODO: remove this check
        const isDebug = true;
        if (isDebug) {
            this.props.history.push("/home");
        }
        else {
            axios.get('http://124.168.104.121:8080/api/v1/auth/login', data)
                .then((res) => {
                    if (res.status == 200) {
                        // verify token here
                        jwt.verify('token', {})

                        // store the authentication key send from server response
                        localStorage.setItem('_key', res.headers.authentication);

                        // redirect to dashboard
                        this.props.history.push("/home");
                    } else {
                        console.log('authentication error!');
                        this.setState({
                            loginError: "Authentication Error: please check username/password combination"
                        })
                    }
                })
        }
    }

    render() {
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
                            }}
                        >Login</DialogTitle>
                        <DialogContent
                            style={{
                                width: "100%",
                                display: "flex",
                                position: "relative",
                                justifyContent: "center"
                            }}>
                            <List>

                                <ListItem>
                                    <img src="./red_bg_logo.jpg" style={{
                                        height: "100px",
                                        width: "100px",
                                        borderRadius: "50%",
                                        display: "block",
                                        margin: "0 auto"
                                    }} />
                                </ListItem>

                                <ListItem>
                                    <TextField style={{
                                        paddingTop: "0px"
                                    }}
                                        label="Username"
                                        margin="dense"
                                        placeholder="Enter Username"
                                        type="text"
                                        name="username"
                                        onChange={(e) => this.onChangeUserName(e)} />
                                </ListItem>

                                <div className="validationMessage">
                                    {this.state.userNameErrorMessage}
                                </div>

                                <ListItem>
                                    <TextField style={{
                                        paddingTop: "0px"
                                    }}
                                        label="Password"
                                        margin="dense"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password"
                                        onChange={(e) => this.onChangePassword(e)} />

                                </ListItem>

                                <div className="validationMessage">
                                    {this.state.passwordErrorMessage}
                                </div>

                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center",
                                        paddingTop: "0px"
                                    }}>
                                    <Button disabled={this.state.disableButton} onClick={() => this.authenticate()}
                                        size="large"
                                        color="primary"
                                        variant="contained">Login</Button>
                                </ListItem>

                                <div className="validationMessage loginValidationMessage">
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
