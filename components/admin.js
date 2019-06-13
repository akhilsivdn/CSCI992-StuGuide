import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, Button } from "@material-ui/core";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { TextField } from '@material-ui/core';

export class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userList: [],
            useremail: '',
            userid: '',
            subject: '',
            messageBody: '',
            username: '',
            isOpen: false
        }
    }

    BlockUser() {
        this.setState({
            isLoading: true
        });

        var url = localStorage.getItem("baseUrl") + "api/v1/admin/toggleUser";

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            toggleUser: this.state.userid,
            userid: this.state.userid
        };

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            this.setState({
                isLoading: false,
                userid: '',
                username: '',
                blockConfirm: false
            });
            window.location.reload();
        });
    }

    EmailUser() {
        this.setState({
            isLoading: true
        });

        var url = localStorage.getItem("baseUrl") + "api/v1/admin/sendMailToUser";

        const transformRequest = (jsonData = {}) =>
            Object.entries(jsonData)
                .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
                .join('&');

        const postBody = {
            subject: this.state.subject,
            body: this.state.messageBody,
            userid: this.state.userid
        };

        axios.post(url, transformRequest(postBody), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            this.setState({
                isLoading: false,
                subject: '',
                messageBody: '',
                userid: '',
                useremail: '',
                username: '',
                isOpen: false
            })
        });
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        });

        var _this = this;
        var array = [];
        var url = localStorage.getItem("baseUrl") + "api/v1/admin/users";

        axios.post(url, {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem("key")
            }
        }).then((res) => {
            if (res.status == 200) {
                if (res.data.code == 200) {
                    res.data.payload.forEach(user => {
                        if (user.id != 1) {
                            array.push({
                                id: user.id,
                                firstname: user.first_name,
                                lastname: user.last_name,
                                username: user.username,
                                email: user.email,
                                enabled: user.enabled ? "true" : "false"
                            });
                        }
                    });

                    _this.setState({
                        userList: array,
                        isLoading: false
                    })
                }
                else {
                    alert("You are not authorized to visit admin dashboard !");
                    _this.props.history.push("/");
                }
            }
        })
    }

    Logout() {
        if (localStorage.getItem('key')) {
            localStorage.removeItem('key');
        }
        this.props.history.push("/");
    }

    handleClose() {

    }


    onClickRow(e) {
        this.setState({
            useremail: e.email,
            userid: e.id,
            username: e.username,
            showUseroptions: true
        })
    }

    onChangeSubject(e) {
        this.setState({
            subject: e.target.value
        })
    }

    onChangeMessageBody(e) {
        this.setState({
            messageBody: e.target.value
        })
    }

    showBlockUI() {
        this.setState({
            blockConfirm: true,
            showUseroptions: false
        })
    }

    showMailUI() {
        this.setState({
            isOpen: true,
            showUseroptions: false
        })
    }

    closeMailUI() {
        this.setState({
            isOpen: false
        })
    }

    closeBlockUI() {
        this.setState({
            blockConfirm: false
        })
    }

    render() {
        const columns = [
            {
                name: 'ID',
                selector: 'id'
            },
            {
                name: 'First Name',
                selector: 'firstname',
                sortable: true
            },
            {
                name: 'Last Name',
                selector: 'lastname',
                sortable: true
            },
            {
                name: 'User Name',
                selector: 'username'
            },
            {
                name: 'Email ID',
                selector: 'email'
            },
            {
                name: 'Enabled',
                selector: 'enabled',
                sortable: true
            }
        ];

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

                <Dialog
                    open={this.state.showUseroptions}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{this.state.username} selected</DialogTitle>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.showBlockUI()}>
                            Block User
                            </Button>
                        <Button color="primary" onClick={() => this.showMailUI()}>
                            Email User
                            </Button>
                    </DialogActions>
                </Dialog>



                <Dialog
                    open={this.state.isOpen}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Compose email"}</DialogTitle>
                    <DialogContent>
                        <div>To: {this.state.useremail}</div>
                        <div><TextField style={{
                            paddingTop: "0px"
                        }}
                            label="Subject"
                            value={this.state.subject}
                            margin="dense"
                            placeholder="Enter subject of email"
                            type="text"
                            name="subject"
                            onChange={(e) => this.onChangeSubject(e)} />
                        </div>
                        <div><TextField style={{
                            paddingTop: "0px"
                        }}
                            label="Message"
                            value={this.state.messageBody}
                            margin="dense"
                            placeholder="Enter your message"
                            type="text"
                            name="message"
                            onChange={(e) => this.onChangeMessageBody(e)} />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.closeMailUI()}>
                            Close
                            </Button>
                        <Button color="primary" onClick={() => this.EmailUser()}>
                            Send
                            </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.blockConfirm}
                    onClose={() => this.handleClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Are you sure to block {this.state.username}</DialogTitle>
                    <DialogActions>
                        <Button color="primary" onClick={() => this.closeBlockUI()}>
                            Close
                            </Button>
                        <Button color="primary" onClick={() => this.BlockUser()}>
                            Block
                            </Button>
                    </DialogActions>
                </Dialog>

                <div style={{ display: "flex", marginTop: "5%" }}>
                    <img className="logo" src="./red_bg_logo.jpg"
                        style={{ height: "75px", width: "75px", borderRadius: "20%" }} />
                    <div className="title_page" style={{ margin: "1%" }}>Admin Dashboard</div>
                </div>
                <div>
                    <DataTable style={{
                        marginTop: "25px",
                        border: "gray",
                        borderStyle: "solid"
                    }}
                        selectableRows={true}
                        title="List of users"
                        columns={columns}
                        data={this.state.userList}
                        onRowClicked={(e) => this.onClickRow(e)}
                    />
                    <Button onClick={() => this.Logout()} style={{ height: "50px", width: "75px" }}>Logout</Button>
                </div>
            </div>
        );
    }
}
