import React from "react";
import axios from 'axios';
import AvatarMUI from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import Avatar from 'react-avatar-edit';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Divider, Typography, Button } from "@material-ui/core";

export class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        const src = './red_bg_logo.jpg'
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
                <div className="title_page">Account Settings</div>
                {error}

                <div>
                    <ExpansionPanel
                        style={{ marginBottom: '10px' }}>
                        <ExpansionPanelSummary
                            style={{
                                fontSize: 'large',
                                fontWeight: '400'
                            }}
                            expandIcon={<ExpandMoreIcon />}>
                            Update Profile Picture
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            Current:
                        </ExpansionPanelDetails>

                        <ExpansionPanelDetails>
                            Preview:
                        </ExpansionPanelDetails>

                        <Divider />

                        <ExpansionPanelActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary">
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
                                fontWeight: '400'
                            }}
                            expandIcon={<ExpandMoreIcon />}>
                            Update Username
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <div style={{marginLeft:"10px"}}>Current: </div>{/* <Chip label="Username" /> */}
                            <TextField
                                style={{marginTop:"10px"}}
                                label="Enter New Username"
                                placeholder="Enter New Username"
                                type="text"
                                name="Username"
                                margin="Dense"
                            />
                        </ExpansionPanelDetails>

                        <ExpansionPanelDetails>
                            {/* <TextField
                                label="Enter New Username"
                                placeholder="Enter New Username"
                                type="text"
                                name="Username"
                                margin="Dense"
                            /> */}
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary">
                                Save
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>

                <div>
                    <ExpansionPanel
                        style={{ marginBottom: '10px' }}>
                        <ExpansionPanelSummary style={{
                            fontSize: 'large',
                            fontWeight: '400'
                        }}
                            expandIcon={<ExpandMoreIcon />}>
                            Update Password
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            Current:
                        </ExpansionPanelDetails>

                        <ExpansionPanelDetails>
                            New:
                        </ExpansionPanelDetails>

                        <ExpansionPanelDetails>
                            Confirm:
                        </ExpansionPanelDetails>

                        <Divider />

                        <ExpansionPanelActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary">
                                Save
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>


                <div>
                    <Button variant="contained" size="small" color="secondary">Deactivate</Button>
                </div>

                {/* <form novalidate>
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
                        {this.state.preview && <div id='second'>
                            <img src={this.state.preview} alt="Preview" />
                        </div>
                        }
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
                </form> */}
            </div>
        );
    }
}