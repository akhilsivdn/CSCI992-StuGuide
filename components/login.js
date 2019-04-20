import React from "react";
import {Link}  from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

export class LoginComponent extends React.Component{

    constructor() {
        super();
      }


    myFunction(){

        }

    render(){
        return(
            <div className="loginSection">

               <TextField label="Username" margin="dense" placeholder="Enter Username" className="inputfield" type="text" />

               <TextField label="Password" margin="dense" placeholder="Enter Password" className="inputfield pos" type="password"/>
               <Link to={'/home'}>
                     <Button size="small" color="primary" variant="contained" className="pos" onClick={this.myFunction}>Login</Button>
               </Link>
               <Link to={'/register'}>
                     <Button size="small" color="secondary" variant="contained" className="pos" onClick={this.myFunction}>Register</Button>
               </Link>
            </div>
        );
    }
}
