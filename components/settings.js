import React from "react";
import axios from 'axios';
import Avatar from 'react-avatar-edit';

export class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        const src = './default.png'
        this.state = {
            username: '',
            password: '',
            repassword: '',
            error: '',
            preview: null,
            src
        };

        this.updateProfile = this.updateProfile.bind(this);
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
    }
    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        this.setState({ preview })
    }

    updateProfile(e) {
        e.preventDefault();
        // validation check

        // password
        if (this.state.password != this.state.repassword) {
            this.setState({
                error: 'Error, Password do not match!'
            });
        } else {
            this.setState({
                error: ''
            });
        }

        console.log('Update profile');
        axios.post(`https:124.168.104.121:8080/api/v1/usercp/updateProfile`)
            .then((res) => {
                // 
            });
    }



    render() {
        const error = (this.state.error) ? (
            <h4>{this.state.error}</h4>
        )
            : '';
        return (
            <div>
                <h1>Profile Settings</h1>
                {error}
                <form novalidate>
                    <div id='container'>
                        <label>Profile Image:</label>
                        <div id='first'>
                            <Avatar
                                width={390}
                                height={275}
                                onCrop={this.onCrop}
                                onClose={this.onClose}
                                src={this.state.src}
                            />
                        </div>
                        <div id='second'>
                            <img src={this.state.preview} alt="Preview" />
                        </div>
                    </div>
                    <div id='bottom'>
                        <div>
                            <label>Username</label>
                            <input type="text" disabled />
                        </div>
                        <br />
                        <br />
                        <div>
                            <label>Password</label>
                            <input
                                type="password"
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                value={this.state.repassword}
                                onChange={(e) => this.setState({ repassword: e.target.value })}
                            />
                        </div>
                        <div>
                            <button class="" type="button" onClick={this.updateProfile}>Update Profile</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}