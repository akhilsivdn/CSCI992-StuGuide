import React from "react";
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem } from '@material-ui/core';
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal } from "@material-ui/core";

export class ForgotPasswordComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            isMailSent: false,
            emailErrorMessage: '',
            otp: '',
            otpErrorMessage: '',
            otpVerified: false,
            isLoading: false
        }
    }

    SendOtp() {
        var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEx.test(String(this.state.emailID).toLowerCase())) {
            this.setState({
                emailErrorMessage: "please enter a valid email address"
            })
            return;
        }

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            email: this.state.emailID
        }

        this.setState({
            isLoading: true
        })
        var _this = this;

        var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/validationpassword"
        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        ).then(function (response) {
            if (response.data.code == 400 || response.data.status == "fail" || response.data.payload.error == "request too often") {
                _this.setState({
                    emailErrorMessage: "You have to wait 5 minutes to receive another OTP",
                    isLoading: false
                })
            }
            else {
                _this.setState({
                    isMailSent: true,
                    isLoading: false
                })
            }
        }).catch(function (error) {
            _this.setState({
                emailErrorMessage: "This email address does not belong to our records. Please confirm email address",
                isLoading: false
            })
        });
    }

    SetEmailID(e) {
        if (this.state.isMailSent) {
            this.setState({
                isMailSent: false
            })
        }
        this.setState({
            emailID: e.target.value
        })
        if (this.state.emailErrorMessage.length > 0) {
            this.setState({
                emailErrorMessage: ''
            })
        }
    }

    SetOtp(code) {
        if (this.state.otpVerified) {
            this.setState({
                otpVerified: false
            })
        }
        this.setState({
            otp: code
        })
        if (this.state.otpErrorMessage.length > 0) {
            this.setState({
                otpErrorMessage: ""
            })
        }
    }

    VerifyOtp() {
        if (this.state.otp.length == 4) {
            this.setState({
                isLoading: true
            })

            const transformRequest = (jsonData = {}) =>
                Object.entries(jsonData)
                    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                    .join('&');

            const postBody = {
                email: this.state.emailID,
                otp: this.state.otp
            }

            var _this = this;

            var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/compareValidationPassword"

            axios.post(url, transformRequest(postBody), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
            ).then(function (response) {
                if (response.data.code != 200) {
                    _this.setState({
                        otpErrorMessage: "OTP you entered is incorrect. Please check your email or try resending it",
                        isLoading: false
                    })
                }
                else {
                    _this.setState({
                        otpVerified: true,
                        isLoading: false
                    })
                }
            }).catch(function (error) {
                _this.setState({
                    otpErrorMessage: "OTP you entered is incorrect. Please check your email or try resending it",
                    isLoading: false
                })
            });
        }
    }

    CancelProcess() {
        this.setState({
            isMailSent: false
        })
    }

    handleClose() {
        this.setState({
            otpVerified: false
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

        if (!this.state.isMailSent) {
            return (
                <Dialog
                    open="TRUE"
                    style={{
                        width: "100%",
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        maxWidth: "none",
                        maxHeight: "700px"
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
                    >Forgot Password</DialogTitle>
                    <Divider />
                    <DialogContent
                        style={{
                            width: "600px",
                            display: "flex",
                            position: "relative",
                            justifyContent: "center",
                            padding: "unset"

                        }}>

                        <List>
                            <ListItem >
                                <img src="./red_bg_logo.jpg" style={{
                                    height: "125px",
                                    width: "125px",
                                    borderRadius: "20%",
                                    display: "block",
                                    margin: "0 auto",
                                    marginTop: "10px"
                                }} />
                            </ListItem>

                            <ListItem style={{
                                margin: "0 auto",
                                maxWidth: "70%"
                            }}>
                                No Problem! Enter your email below and we will send you an email with OTP to reset your password.
                                </ListItem>

                            <ListItem>
                                <input type="text" className="form-control form-control-lg form_search"
                                    placeholder="Enter your email address"
                                    onChange={(e) => this.SetEmailID(e)}
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "10px",
                                        marginLeft: '20px',
                                        width: '60%'
                                    }} />

                                <Button
                                    color="primary"
                                    variant="contained"
                                    style={{
                                        marginLeft: "10px",
                                        width: " 40%",
                                        height: "3em"
                                    }} onClick={() => this.SendOtp()}>
                                    Reset Password
                                    </Button>
                            </ListItem>
                            <ListItem>
                                <span className="forgotPasswordSection"
                                    style={{
                                        marginBottom: '5px',
                                        color: "red"
                                    }}>
                                    {this.state.emailErrorMessage}
                                </span>
                            </ListItem>

                        </List>
                    </DialogContent>
                </Dialog>

                // <div className="loginSection" style={{
                //     width: "50%",
                //     height: "85%"
                // }}>
                //     <img src="./red_bg_logo.jpg" style={{
                //         height: "125px",
                //         width: "125px",
                //         borderRadius: "20%",
                //         display: "block",
                //         margin: "0 auto",
                //         marginTop: "10px"
                //     }} />
                //     <div className="title_page" style={{
                //         margin: "0 auto"
                //     }}>Forgot Password</div>
                //     <div style={{
                //         margin: "0 auto",
                //         maxWidth: "50%"
                //     }}>No Problem! Enter your email below and we will send you an email with OTP to reset your password.</div>
                //     <div className="forgotPasswordSection" style={{
                //         display: "flex",
                //         alignItems: "center"
                //     }}>
                //         <input type="text" className="form-control form-control-lg form_search" placeholder="Enter your email address"
                //             onChange={(e) => this.SetEmailID(e)} style={{ marginTop: "10px", marginBottom: "10px" }} />
                //         <button style={{
                //             marginLeft: "15px",
                //             width: "250px",
                //             height: "3em"
                //         }} onClick={() => this.SendOtp()}>Reset password</button>
                //     </div>
                //     <span className="forgotPasswordSection" style={{ marginTop: "5%", color: "red" }}>{this.state.emailErrorMessage}</span>
                // </div>


            )
        }

        else if (this.state.isMailSent && !this.state.otpVerified) {
            return (

                <Dialog
                    open="TRUE"
                    style={{
                        width: "100%",
                        display: "flex",
                        position: "relative",
                        justifyContent: "center",
                        maxWidth: "none",
                        maxHeight: "700px"
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
                    >One Time Password</DialogTitle>
                    <Divider />
                    <DialogContent
                        style={{
                            width: "600px",
                            display: "flex",
                            position: "relative",
                            justifyContent: "center",
                            padding: "unset"

                        }}>

                        <List>
                            <ListItem >
                                <img src="./red_bg_logo.jpg" style={{
                                    height: "125px",
                                    width: "125px",
                                    borderRadius: "20%",
                                    display: "block",
                                    margin: "0 auto",
                                    marginTop: "10px"
                                }} />
                            </ListItem>

                            <ListItem style={{
                                margin: "0 auto",
                                maxWidth: "70%",
                                marginBottom:"10px"
                            }}>
                                <span>
                                    In case you did not receive OTP, you will be able to regenerate the OTP in 5 minutes.
                                    <a onClick={() => this.CancelProcess()} style={{ color: "#007bff", marginLeft: "10px" }}>Resend OTP</a>
                                </span>

                            </ListItem>

                            <ListItem>
                                <OtpInput
                                    inputStyle={{marginLeft:"10px", marginRight:"10px", height: "2.5em", width: "2.5em" }}
                                    onChange={(otp) => this.SetOtp(otp)}
                                    numInputs={4}
                                    separator={<span>-</span>} />
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={this.state.otp.length < 4}
                                    style={{
                                        marginLeft: "15px",
                                        width: "250px",
                                        height: "3em"
                                    }}
                                    onClick={() => this.VerifyOtp()}>
                                    Verify OTP
                                </Button>
                            </ListItem>
                            <ListItem style={{height:"70px"}}>
                                <span className="forgotPasswordSection" style={{
                                    marginBottom: '5px',
                                    color: "red"
                                }}>{this.state.otpErrorMessage}</span>
                            </ListItem>
                        </List>
                    </DialogContent>
                </Dialog>

                // <div className="loginSection" style={{
                //     width: "50%",
                //     height: "85%"
                // }}>
                //     <img src="./red_bg_logo.jpg" style={{
                //         height: "125px",
                //         width: "125px",
                //         borderRadius: "20%",
                //         display: "block",
                //         margin: "0 auto",
                //         marginTop: "10px"
                //     }} />
                //     <div className="title_page" style={{
                //         margin: "0 auto"
                //     }}>One Time Password</div>
                //     <div style={{
                //         margin: "0 auto",
                //         maxWidth: "50%"
                //     }}>
                //         <span>
                //             In case you did not receive OTP, you will be able to regenerate the OTP in 5 minutes.
                //         </span>
                //         <a onClick={() => this.CancelProcess()} style={{ color: "#007bff", marginLeft: "10px" }}>Resend OTP</a>
                //     </div>
                //     <div className="forgotPasswordSection" style={{
                //         display: "flex",
                //         alignItems: "center"
                //     }}>
                //         <OtpInput inputStyle={{ height: "2.5em", width: "2.5em" }}
                //             onChange={(otp) => this.SetOtp(otp)}
                //             numInputs={4}
                //             separator={<span>-</span>} />
                //         <button disabled={this.state.otp.length < 4} style={{
                //             marginLeft: "15px",
                //             width: "250px",
                //             height: "3em"
                //         }} onClick={() => this.VerifyOtp()}>Verify OTP</button>
                //     </div>
                //     <span className="forgotPasswordSection" style={{ marginTop: "5%", color: "red" }}>{this.state.otpErrorMessage}</span>
                // </div>
            )
        }
        else {
            return (
                <Dialog
                    open={true}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"New password is sent to your email address"}</DialogTitle>
                    <DialogActions>
                        <Button color="primary">
                            <Link to="/">Ok</Link>
                        </Button>
                    </DialogActions>
                </Dialog>
            )
        }
    }
}