import React from "react";
import {Link}  from "react-router-dom";


export class LoginComponent extends React.Component{
   
    constructor() {
        super();
      }

  
    myFunction(){
        
        }
   
   
    render(){
        return(
            <div className="loginSection">
               <input placeholder="student id" className="inputfield" type="text" />
               <input placeholder="password" className="inputfield pos" type="password"/>
               <Link to={'/home'}>
                     <button className="pos" onClick={this.myFunction}>Login</button>
               </Link>
               <Link to={'/register'}>
                     <button className="pos" onClick={this.myFunction}>Register</button>
               </Link>
            </div>   
        );
    }
}