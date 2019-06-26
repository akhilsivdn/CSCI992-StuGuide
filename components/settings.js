import React from "react";
import axios from 'axios';
import Avatar from 'react-avatar-edit';
import { List, ListItem } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, Button } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            currentUserName: '',
            password: '',
            confirmPassword: '',
            isLoading: false,
            fullName: '',
            passwordErrorMessage: '',
            usernameErrorMessage: ''
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        var _this = this;
        var url = localStorage.getItem("baseUrl") + "api/v1/usercp/getUserProfile";

        axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            if (res.status == 200) {
                _this.setState({
                    isLoading: false,
                    currentUserName: res.data.payload.username,
                    fullName: res.data.payload.first_name + " " + res.data.payload.last_name
                })
            }
        })
    }

    updateUsername() {
        if (this.state.username.length < 5 || this.state.username.length > 12) {
            this.setState({
                usernameErrorMessage: "user name must be 5-12 characters long"
            });
            return;
        }
        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            username: this.state.username
        };

        this.setState({
            isLoading: true
        });

        var _this = this;
        var url = localStorage.getItem("baseUrl") + "api/v1/usercp/updateProfile";

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            if (res.status == 200 && res.data.code == 200) {
                var newUserName = _this.state.username;
                _this.setState({
                    isLoading: false,
                    isOpen: true,
                    dialogText: "Profile updated successfully"
                })

                if (res.data.code == 400) {
                    _this.setState({
                        isLoading: false,
                        isOpen: true,
                        dialogText: "Profile update error - this user name is already taken"
                    })
                }
            }
        })
    }

    changeUserName(e) {
        if (this.state.usernameErrorMessage.length > 0) {
            this.setState({
                usernameErrorMessage: ""
            })
        }
        this.setState({
            username: e.target.value
        })
    }

    UpdatePassword() {
        if (this.state.password.length < 5) {
            this.setState({
                passwordErrorMessage: "password too small. minimum 5 characters needed"
            });
            return;
        }
        if (this.state.password != this.state.confirmPassword) {
            this.setState({
                passwordErrorMessage: "passwords don't match"
            });
            return;
        }
        var validPassword = (/^([a-zA-Z0-9]+)$/.test(this.state.password.toLowerCase()) && /\d/.test(this.state.password.toLowerCase()) &&
            /[A-Z]/i.test(this.state.password.toLowerCase()))
        if (!validPassword) {
            this.setState({
                passwordErrorMessage: "Please should be a combination of characters and numbers"
            });
            return;
        }
        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            password: this.state.password,
            password_confirm: this.state.confirmPassword
        };

        this.setState({
            isLoading: true
        });

        var _this = this;
        var url = localStorage.getItem("baseUrl") + "api/v1/usercp/changePassword";

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            if (res.data.code == 200) {
                _this.setState({
                    isLoading: false,
                    isOpen: true,
                    dialogText: "Profile updated successfully"
                })
            }
            else {
                _this.setState({
                    isLoading: false,
                    isOpen: true,
                    dialogText: "Profile update error"
                })
            }
        })
    }

    changePassword(e) {
        if (this.state.passwordErrorMessage.length > 0) {
            this.setState({
                passwordErrorMessage: ""
            })
        }
        this.setState({
            password: e.target.value
        })
    }

    changeRePassword(e) {
        if (this.state.passwordErrorMessage.length > 0) {
            this.setState({
                passwordErrorMessage: ""
            })
        }
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleClose() {
        this.setState({
            isOpen: false
        })
        window.location.reload();
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
            <div>
                <div className="title_page">Account Settings</div>
                <div className="title_page" style={{ fontWeight: "400" }}>Hi, {this.state.fullName}</div>

                <div>
                    <Dialog
                        open={this.state.isOpen}
                        onClose={() => this.handleClose()}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Profile updated successfully"}</DialogTitle>
                        <DialogActions>
                            <Button color="primary" onClick={() => this.handleClose()}>
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <ExpansionPanel
                        style={{ marginBottom: '10px' }}>
                        <ExpansionPanelSummary

                            style={{
                                fontSize: 'large',
                                fontWeight: '400',
                                backgroundColor: 'rgba(0, 0, 0, .03)',
                                borderBottom: '1px solid rgba(0, 0, 0, .125)'
                            }}
                            expandIcon={<ExpandMoreIcon />}>
                            Update Username
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <List>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    Current: {this.state.currentUserName}
                                </ListItem>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        value={this.state.username}
                                        onChange={(e) => this.changeUserName(e)}
                                        label="New Username"
                                        placeholder="Enter New Username"
                                        type="text"
                                        name="Username"
                                        margin="Dense"
                                    />
                                </ListItem>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    <div className="validationMessage" style={{ height: "auto" }}>
                                        {this.state.usernameErrorMessage}
                                    </div>
                                </ListItem>
                            </List>
                        </ExpansionPanelDetails>

                        <Divider />
                        <ExpansionPanelActions>
                            <Button onClick={() => this.updateUsername()} size="small" color="primary">
                                Save
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>

                <div>
                    <ExpansionPanel
                        style={{ marginBottom: '10px' }}>
                        <ExpansionPanelSummary
                            style={{
                                fontSize: 'large',
                                fontWeight: '400',
                                backgroundColor: 'rgba(0, 0, 0, .03)',
                                borderBottom: '1px solid rgba(0, 0, 0, .125)'
                            }}
                            expandIcon={<ExpandMoreIcon />}>
                            Update Password
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <List>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        label="New Password"
                                        value={this.state.password}
                                        onChange={(e) => this.changePassword(e)}
                                        placeholder="Enter New Password"
                                        type="password"
                                        name="Password"
                                        margin="Dense"
                                    />
                                </ListItem>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    <TextField
                                        style={{ marginTop: "10px" }}
                                        label="Confrim Password"
                                        placeholder="Condfirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={(e) => this.changeRePassword(e)}
                                        type="password"
                                        name="ConfirmPassword"
                                        margin="Dense"
                                    />
                                </ListItem>
                                <ListItem style={{
                                    paddingTop: "unset",
                                    marginTop: "10px"
                                }}>
                                    <div className="validationMessage" style={{ height: "auto" }}>
                                        {this.state.passwordErrorMessage}
                                    </div>
                                </ListItem>
                            </List>
                        </ExpansionPanelDetails>

                        <Divider />
                        <ExpansionPanelActions>
                            <Button onClick={() => this.UpdatePassword()} size="small" color="primary">
                                Save
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>
            </div>
        );
    }
}