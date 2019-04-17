import React from "react";
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";

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

        //redirect to home on succesful registration.
        if (this.state.redirect) {
            return <Redirect push to="/home" />;
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="loginSection">
                    <input placeholder="User name" className="inputfield" type="text" name="username" />
                    <input placeholder="Email" className="inputfield" type="text" name="email" />
                    <input placeholder="Password" className="inputfield" type="password" name="password" />
                    <input placeholder="Confirm password" className="inputfield" type="password"
                        name="password_confirm" />
                    <button className="pos">Submit</button>
                </div>
            </form>

        );
    }
}