import React from "react";
import {Link}  from "react-router-dom";
import LoginComponent from "./login";
import RegisterComponent from "./register";

export class Header extends React.Component{
   
    constructor() {
        super();
        this.state = {
            isClicked : false
        }
      }

  
    myFunction(x){
        this.setState({
            isClicked: !this.state.isClicked
        });
    }
   

    
    showMyComponent(){
        return false;
    }
   
    render(){
        return(
            <div className="headerContainer" style={this.showMyComponent ? {} : { display: 'none' }}>
                <div className="left">
                    <div className={"barContainer  "+ (this.state.isClicked ? "change" : "")} onClick={this.myFunction.bind(this)}>
                        <div className="bar1"></div>
                        <div className="bar2"></div>
                        <div className="bar3"></div>
                    </div>
                </div>
                
                <div className="right">
                    <Link to={'/search'}>
                        <img src={'./search (1).png'} width={'50px'} height={'50px'}/> 
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