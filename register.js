import React from "react";
import {Link}  from "react-router-dom";
import { TextField, Button } from '@material-ui/core';

export class RegisterComponent extends React.Component{

    constructor() {
        super();
      }


    myFunction(){

        }


    render(){
        return(
            <div className="loginSection">
               <TextField variant="outlined" label="First Name" margin="dense" placeholder="First Name"       className="inputfield" type="text" />
               <TextField variant="outlined" label="Last Name"  margin="dense" placeholder="Last Name"        className="inputfield" type="text" />
               <TextField variant="outlined" label="E-mail"     margin="dense" placeholder="e-mail"           className="inputfield" type="text" />
               <TextField variant="outlined" label="Password"   margin="dense" placeholder="Password"         className="inputfield" type="password"/>
               <TextField variant="outlined" label="Confirm Password"   margin="dense" placeholder="confirm password" className="inputfield" type="password"/>
               <Link to={'/'}>
                     <Button color="primary" variant="raised" className="pos" onClick={this.myFunction}>Login</Button>
               </Link>
            </div>
        );
    }
}
