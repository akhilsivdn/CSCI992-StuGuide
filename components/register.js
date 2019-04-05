import React from "react";
import {Link}  from "react-router-dom";

export class RegisterComponent extends React.Component{
   
    constructor() {
        super();
      }

  
    myFunction(){
        
        }
   
   
    render(){
        return(
            <div className="loginSection">
               <input placeholder="student full name" className="inputfield" type="text" />
               <input placeholder="student id" className="inputfield" type="text" />
               <input placeholder="student email" className="inputfield" type="text" />
               <input placeholder="password" className="inputfield" type="password"/>
               <input placeholder="confirm password" className="inputfield" type="password"/>
               <Link to={'/home'}>
                     <button className="pos" onClick={this.myFunction}>Login</button>
               </Link>
            </div>   
        );
    }
}