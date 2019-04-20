import React from "react";
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import TopbarComponent from "./Topbar";
import DrawerComponent from "./drawer";
import { SearchComponent } from "./search";
import { RegisterComponent } from "./register";
import { LoginComponent } from "./login";
import { AppBar, Toolbar, IconButton, Typography, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from '@material-ui/icons/Search';


export class HeaderComponent extends React.Component {

    constructor() {
        super();
        this.state = {
            open: false
        }
    }


    openDrawer() {
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

    closeDrawer() {
        this.setState({
            open: false,
        });
    }


    render() {
        return (

            <div>
                <AppBar position="relative">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={() => this.openDrawer()}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" noWrap>
                            StuGuide
                        </Typography>
                        <IconButton color="inherit" onClick='/search'>
                            <SearchIcon />
                        </IconButton>
                        {/* <Button color="inherit">
                            LOGOUT
                        </Button> */}
                    </Toolbar>
                </AppBar>

                <DrawerComponent
                    open={this.state.open}
                    close={() => this.setState({ open: false })}
                />
            </div>


            // <div className="headerContainer">
            //     <div className="left">
            //         {/* <div className={"barContainer  "+ (this.state.isClicked ? "change" : "")} onClick={this.myFunction.bind(this)}>
            //             <div className="bar1"></div>
            //             <div className="bar2"></div>
            //             <div className="bar3"></div>
            //         </div> */}


            //             <div className="wrapper">
            //                 <TopbarComponent onMenuClick={() => this.openDrawer()} />
            //                 <DrawerComponent
            //                     open={this.state.open}
            //                     close={() => this.setState({ open: false })} />


            //             </div>

            //     </div>

            //     <div className="right">
            //         <Link to={'/search'}>
            //             <img src={'./search (1).png'} width={'50px'} height={'50px'} />
            //         </Link>
            //     </div>

            //     <div className="center">
            //         <Link to={'/'} className="titleLink">
            //             <div className="barContainer title">
            //                 StuGuide
            //             </div>
            //         </Link>
            //     </div>
            // </div>
        );
    }
}