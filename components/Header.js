import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import TopbarComponent from "./Topbar";
import DrawerComponent from "./drawer";
import { SearchComponent } from "./search";
import { RegisterComponent } from "./register";
import { LoginComponent } from "./login";



export class Header extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        }
    }


    openDrawer () {
        if (this.state.open) {
            this.setState({
                open: false,
            });
        } else {
            this.setState({
                open: true,
            });
        }
    }

    closeDrawer () {
        this.setState({
            open: false,
        });
    }


    render() {
        return (
            <div className="headerContainer">
                <div className="left">
                    {/* <div className={"barContainer  "+ (this.state.isClicked ? "change" : "")} onClick={this.myFunction.bind(this)}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div> */}

                   
                        <div className="wrapper">
                            <TopbarComponent onMenuClick={() => this.openDrawer()} />
                            <DrawerComponent
                                open={this.state.open}
                                close={() => this.setState({ open: false })} />
                            
                            
                        </div>

                </div>

                <div className="right">
                    <Link to={'/search'}>
                        <img src={'./search (1).png'} width={'50px'} height={'50px'} />
                    </Link>
                </div>

                <div className="center">
                    <Link to={'/'} className="titleLink">
                        <div className="barContainer title">
                            StuGuide
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}