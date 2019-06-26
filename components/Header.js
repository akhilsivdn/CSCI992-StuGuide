import React from "react";
import { Link } from "react-router-dom";
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
                <AppBar>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            onClick={() => this.openDrawer()}
                            style={{ flex: 0, alignItems: 'center', justifyContent: 'center' }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h5" color="inherit" noWrap
                            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Link to="/home" style={{
                                color: 'white',
                                textDecoration: 'none'
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
        );
    }
}