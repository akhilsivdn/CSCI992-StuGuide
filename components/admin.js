import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Modal, Button } from "@material-ui/core";
import DataTable from 'react-data-table-component';

export class AdminComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    BlockUser(){
        //Add code to block user
    }

    EmailUser(){
        //Add code to block user
    }

    render() {
        window.scrollTo(0, 0);

        // Get data from backend
        const data = [{ id: 1, firstname: 'qeqewe', lastname: 'S', username: 'dgkdagk52', email: 'as385@dhdj.com' },
        { id: 2, firstname: 'affafa', lastname: 'P', username: 'adaii84', email: 'as385@dhdj.com' },
        { id: 3, firstname: 'sffsf', lastname: 'T', username: 'nthw2345', email: 'dsfsf@dhdj.com' },
        { id: 4, firstname: 'fssgfwg', lastname: 'C', username: 'hkgsjkfsg', email: 'as385@dhdj.com' },
        { id: 5, firstname: 'eyrurheg', lastname: 'T', username: 'ryri', email: 'uyrldb@dhdj.com' }];
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
                        data={data}
                    />
                    <Button onClick={this.BlockUser} style={{ height: "50px", width: "75px" }}>Block User(s)</Button>
                    <Button onClick={this.EmailUser} style={{ height: "50px", width: "75px" }}>Email User</Button>
                </div>
            </div>
        );
    }
}
