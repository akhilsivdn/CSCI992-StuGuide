import React from "react";
import OtpInput from 'react-otp-input';
import axios from 'axios';
import { TextField, Button, Paper, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@material-ui/core';

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
            confirmPassword: '',
            password: '',
            passwordChangeError: ''
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

        this.setState({
            isMailSent: true
        })

        // const transformRequest = (jsonData = {}) =>
        //     Object.entries(jsonData)
        //         .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        //         .join('&');

        // const postBody = {
        //     email: this.state.emailID
        // }

        // var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/validationpassword"
        // axios.post(url, transformRequest(postBody), {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //     }
        // }
        // ).then(function (response) {
        //     debugger
        //     this.setState({
        //         isMailSent: true
        //     })
        // });
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
                otpVerified: true
            })

            // const transformRequest = (jsonData = {}) =>
            //     Object.entries(jsonData)
            //         .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
            //         .join('&');

            // const postBody = {
            //     email: this.state.emailID,
            //     otp: this.state.otp
            // }

            // var url = "https://cors-anywhere.herokuapp.com/" + localStorage.getItem("baseUrl") + "api/v1/auth/compareValidationPassword"

            // axios.post(url, transformRequest(postBody), {
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //     }
            // }
            // ).then(function (response) {
            //     debugger
            // });
        }
    }

    CancelProcess() {
        this.setState({
            isMailSent: false
        })
    }

    updatePassword(e) {
        if (this.state.passwordChangeError.length > 0) {
            this.setState({
                passwordChangeError: ""
            })
        }
        this.setState({
            password: e.target.value
        })
    }

    updateconfirmPassword(e) {
        if (this.state.passwordChangeError.length > 0) {
            this.setState({
                passwordChangeError: ""
            })
        }
        this.setState({
            confirmPassword: e.target.value
        })
    }


    changePassword() {
        if (this.state.password != this.state.confirmPassword) {
            this.setState({
                passwordChangeError: "These passwords don't match. Try again?"
            })
            return;
        }

        //Add API calls here and take back to login
    }


    render() {
        if (!this.state.isMailSent) {
            return (
                <div className="loginSection" style={{
                    width: "50%",
                    height: "85%",
                    borderStyle: "dashed",
                    borderColor: "antiquewhite"
                }}>
                    <img src="./red_bg_logo.jpg" style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "20%",
                        display: "block",
                        margin: "0 auto",
                        marginTop: "10px"
                    }} />
                    <div className="title_page" style={{
                        margin: "0 auto"
                    }}>Forgot Password</div>
                    <div style={{
                        margin: "0 auto",
                        maxWidth: "50%"
                    }}>No Problem! Enter your email below and we will send you an email with OTP to reset your password.</div>
                    <div className="forgotPasswordSection" style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <input type="text" className="form-control form-control-lg form_search" placeholder="Enter your email address"
                            onChange={(e) => this.SetEmailID(e)} style={{ marginTop: "10px", marginBottom: "10px" }} />
                        <button style={{
                            marginLeft: "15px",
                            width: "250px",
                            height: "3em"
                        }} onClick={() => this.SendOtp()}>Reset password</button>
                    </div>
                    <span className="forgotPasswordSection" style={{ marginTop: "5%", color: "red" }}>{this.state.emailErrorMessage}</span>
                </div>
            )
        }

        else if (this.state.isMailSent && !this.state.otpVerified) {
            return (
                <div className="loginSection" style={{
                    width: "50%",
                    height: "85%",
                    borderStyle: "dashed",
                    borderColor: "antiquewhite"
                }}>
                    <img src="./red_bg_logo.jpg" style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "20%",
                        display: "block",
                        margin: "0 auto",
                        marginTop: "10px"
                    }} />
                    <div className="title_page" style={{
                        margin: "0 auto"
                    }}>One Time Password</div>
                    <div style={{
                        margin: "0 auto",
                        maxWidth: "50%"
                    }}>
                        <span>
                            In case you did not receive OTP, you will be able to regenerate the OTP in 5 minutes.
                        </span>
                        <a onClick={() => this.CancelProcess()} style={{ color: "#007bff", marginLeft: "10px" }}>Resend OTP</a>
                    </div>
                    <div className="forgotPasswordSection" style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <OtpInput inputStyle={{ height: "2.5em", width: "2.5em" }}
                            onChange={(otp) => this.SetOtp(otp)}
                            numInputs={4}
                            separator={<span>-</span>} />
                        <button disabled={this.state.otp.length < 4} style={{
                            marginLeft: "15px",
                            width: "250px",
                            height: "3em"
                        }} onClick={() => this.VerifyOtp()}>Verify OTP</button>
                    </div>
                    <span className="forgotPasswordSection" style={{ marginTop: "5%", color: "red" }}>{this.state.otpErrorMessage}</span>
                </div>
            )
        }
        else if (this.state.otpVerified) {
            return (
                <div className="loginSection" style={{
                    width: "50%",
                    height: "85%",
                    borderStyle: "dashed",
                    borderColor: "antiquewhite"
                }}>
                    <img src="./red_bg_logo.jpg" style={{
                        height: "150px",
                        width: "150px",
                        borderRadius: "20%",
                        display: "block",
                        margin: "0 auto",
                        marginTop: "10px"
                    }} />
                    <div className="title_page" style={{
                        margin: "0 auto"
                    }}>Reset password</div>
                    <div style={{
                        margin: "0 auto",
                        maxWidth: "50%"
                    }}>Enter a new password for your account</div>
                    <div className="forgotPasswordSection" style={{
                        alignItems: "center"
                    }}>
                        <input type="password" className="form-control form-control-lg form_search" placeholder="Enter new password"
                            onChange={(e) => this.updatePassword(e)} style={{ marginTop: "25%", marginBottom: "10px" }} />
                        <input type="password" className="form-control form-control-lg form_search" placeholder="Confirm new password"
                            onChange={(e) => this.updateconfirmPassword(e)} style={{ marginTop: "15px", marginBottom: "10px" }} />

                        <button disabled={this.state.otp.length < 4} style={{
                            marginLeft: "15px",
                            width: "250px",
                            height: "3em",
                            marginRight: "15px"
                        }} onClick={() => this.changePassword()}>Change Password</button>
                    </div>
                    <span className="forgotPasswordSection" style={{ marginTop: "20%", color: "red" }}>{this.state.passwordChangeError}</span>
                </div>
            )
        }
    }
}