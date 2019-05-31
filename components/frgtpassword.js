import React from "react";
import { Link } from "react-router-dom";
import OtpInput from 'react-otp-input';

export class ForgotPasswordComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            isMailSent: false
        }
    }

    SendOtp() {
        this.setState({
            isMailSent: true
        })
    }

    FilteredList(e) {
        this.setState({
            emailID: e.target.value
        })
    }

    MatchOtp(otp) {
        //TODO: write API code
    }

    CancelProcess() {
        this.setState({
            isMailSent: false
        })
    }

    render() {
        if (this.state.isMailSent) {
            return (
                <div className="forgotPasswordSection">
                    <OtpInput inputStyle={{ height: "2.5em", width: "2.5em" }}
                        onChange={(otp) => this.MatchOtp(otp)}
                        numInputs={4}
                        separator={<span>-</span>} />

                    <button className="sendOtpButton" onClick={() => this.SendOtp()}>Verify OTP</button>
                    <button className="sendOtpButton changeEmail" onClick={() => this.CancelProcess()}>Change email</button>
                </div>
            );
        }

        else {
            return (
                <div className="forgotPasswordSection">
                    <input type="text" className="form-control form-control-lg form_search" placeholder="Enter your email ID"
                        onChange={(e) => this.FilteredList(e)} style={{ marginTop: "10px", marginBottom: "10px" }} />

                    <button className="sendOtpButton" onClick={() => this.SendOtp()}>Send OTP</button>
                </div>
            )
        }
    }
}