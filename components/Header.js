import React from "react";
import { browserHistory } from 'react-router';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import DrawerComponent from "./drawer";
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
            document.body.style.overflow = 'visible';
        } else {
            this.setState({
                open: true,
            });
            document.body.style.overflow = 'hidden';
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
                            style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}

                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" color="inherit" noWrap style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Link to="/home" style={{
                                'color': 'white',
                                'text-decoration': 'none'
                            }} >
                                StuGuide
                            </Link>
                        </Typography>

                        <Link to="/search">
                            <Button variant="flat" style={{ color: "white" }} >

                                <SearchIcon style={{
                                    height: '100%',
                                    position: 'relative',
                                    pointerEvents: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                />
                            </Button>
                        </Link>
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