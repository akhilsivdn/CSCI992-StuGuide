import React from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@material-ui/core';

export class LoginComponent extends React.Component {

    constructor() {
        super();
    }

    myFunction() {

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
                        }}
                    >
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
                            }}
                        >
                            <List>
                                <ListItem>
                                    <TextField
                                        label="Username"
                                        margin="dense"
                                        placeholder="Enter Username"
                                        type="text"
                                        name="username" />
                                </ListItem>

                                <ListItem>
                                    <TextField
                                        label="Password"
                                        margin="dense"
                                        placeholder="Enter Password"
                                        type="password"
                                        name="password" />
                                </ListItem>

                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center"
                                    }}>
                                    <Link to={'/home'}>
                                        <Button
                                            size="large"
                                            color="primary"
                                            variant="contained">Login</Button>
                                    </Link>
                                </ListItem>

                                <ListItem
                                    style={{
                                        display: "flex",
                                        position: "relative",
                                        justifyContent: "center"
                                    }}>
                                    <span >
                                        <Link to={'/'}> {/** Need to implement */}
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

                {/* <TextField label="Username" margin="dense" placeholder="Enter Username" className="inputfield" type="text" />

                <TextField label="Password" margin="dense" placeholder="Enter Password" className="inputfield pos" type="password" />
                <Link to={'/home'}>
                    <Button size="small" color="primary" variant="contained" className="pos" onClick={this.myFunction}>Login</Button>
                </Link>
                <Link to={'/register'}>
                    <Button size="small" color="secondary" variant="contained" className="pos" onClick={this.myFunction}>Register</Button>
                </Link> */}
            </div >

        );
    }
}
