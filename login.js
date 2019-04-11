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

               <TextField variant="outlined" label="Username" margin="dense" placeholder="Username" className="inputfield" type="text" />

               <TextField variant="outlined" label="Password" margin="dense" placeholder="Password" className="inputfield pos" type="password"/>
               <Link to={'/home'}>
                     <Button color="primary" variant="raised" className="pos" onClick={this.myFunction}>Login</Button>
               </Link>
               <Link to={'/register'}>
                     <Button color="secondary" variant="raised" className="pos" onClick={this.myFunction}>Register</Button>
               </Link>
            </div>
        );
    }
}
